import { describe, expect, it } from "vitest";
import { getNextRide, getUpcomingRides } from "./rides";
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

  it("drops a ride once its start time has passed (same day)", () => {
    const morning = ride("morning", "2026-05-10", "9:00 AM"); // already started today
    const afternoon = ride("afternoon", "2026-05-10", "3:00 PM"); // still upcoming
    expect(getNextRide([morning, afternoon], now)?.id).toBe("afternoon");
  });

  it("returns null when every ride is in the past", () => {
    expect(getNextRide([ride("old", "2026-05-01", "9:00 AM")], now)).toBeNull();
  });
});
