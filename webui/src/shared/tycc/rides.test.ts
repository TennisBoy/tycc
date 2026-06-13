import { describe, expect, it } from "vitest";
import { getNextRide, getRideStart, getUpcomingRides } from "./rides";
import { rideEvents } from "./content";
import type { RideEvent } from "./types";

const ride = (id: string, date: string, time: string): RideEvent => ({
  id,
  title: id,
  date,
  time,
  rideType: "Group ride",
  difficulty: "All levels",
  area: "",
  meetup: "",
  distance: "",
  preview: "",
  gear: "",
});

describe("ride scheduling", () => {
  // Fixed "now": May 10 2026, 12:00 PM.
  const now = new Date(2026, 4, 10, 12, 0, 0);

  it("keeps rides starting now or later, soonest first", () => {
    const events = [ride("late", "2026-06-01", "9:00 AM"), ride("soon", "2026-05-20", "9:00 AM")];
    expect(getUpcomingRides(events, now).map((event) => event.id)).toEqual(["soon", "late"]);
  });

  it("keeps a ride featured all of its date, even after it has started or ended", () => {
    // The BMO ride ran 1:30-4:30 PM; at 7:25 PM the same day it should still show.
    const today = ride("today", "2026-05-10", "1:30 PM – 4:30 PM");
    const evening = new Date(2026, 4, 10, 19, 25, 0);
    expect(getNextRide([today], evening)?.id).toBe("today");
  });

  it("orders multiple same-day rides by start time", () => {
    const morning = ride("morning", "2026-05-10", "9:00 AM");
    const afternoon = ride("afternoon", "2026-05-10", "3:00 PM");
    expect(getUpcomingRides([afternoon, morning], now).map((event) => event.id)).toEqual([
      "morning",
      "afternoon",
    ]);
  });

  it("returns null only once the ride's date is fully over", () => {
    expect(getNextRide([ride("old", "2026-05-01", "9:00 AM")], now)).toBeNull();
  });
});

describe("getRideStart time parsing", () => {
  const at = (time: string): [number, number] => {
    const start = getRideStart(ride("x", "2026-05-10", time));
    return [start.getHours(), start.getMinutes()];
  };

  it("reads the leading time of a range (regression: ranges fell back to 23:59)", () => {
    expect(at("2:45 PM – 4:00 PM")).toEqual([14, 45]);
    expect(at("1:30 PM – 4:30 PM")).toEqual([13, 30]);
  });

  it("reads a time followed by a trailing note", () => {
    expect(at("7:00 AM roll out")).toEqual([7, 0]);
  });

  it("still parses a bare single time", () => {
    expect(at("9:00 AM")).toEqual([9, 0]);
    expect(at("3:00 PM")).toEqual([15, 0]);
  });

  it("handles 12 PM (noon) and 12 AM (midnight)", () => {
    expect(at("12:00 PM")).toEqual([12, 0]);
    expect(at("12:00 AM")).toEqual([0, 0]);
  });

  it("falls back to 23:59 only when there is no parseable time", () => {
    expect(at("TBD")).toEqual([23, 59]);
  });

  it("parses every real ride to a concrete start time (none hit the fallback)", () => {
    for (const event of rideEvents) {
      const start = getRideStart(event);
      expect([start.getHours(), start.getMinutes()]).not.toEqual([23, 59]);
    }
  });
});
