import { describe, expect, it } from "vitest";
import {
  ALL_AREAS,
  ALL_DIFFICULTIES,
  ALL_RIDE_TYPES,
  ANY_DAY,
  buildCalendarCells,
  getInitialMonthIndex,
  getRideMonths,
  matchesFilters,
} from "./calendar";
import { rideEvents } from "./content";
import type { RideEvent } from "./types";

const ride = (overrides: Partial<RideEvent> & Pick<RideEvent, "id" | "date">): RideEvent => ({
  title: overrides.id,
  time: "9:00 AM",
  rideType: "Group ride",
  difficulty: "All levels",
  area: "North York",
  meetup: "",
  distance: "",
  preview: "",
  gear: "",
  ...overrides,
});

describe("getRideMonths", () => {
  const events = [
    ride({ id: "b", date: "2026-06-13" }),
    ride({ id: "a", date: "2026-04-26" }),
    ride({ id: "a2", date: "2026-04-02" }),
    ride({ id: "c", date: "2027-01-10" }),
  ];

  it("returns distinct months, chronological, with labels", () => {
    const months = getRideMonths(events, new Date(2026, 5, 1)); // June, already in the data
    expect(months.map((m) => m.value)).toEqual(["2026-04", "2026-06", "2027-01"]);
    expect(months[0].label).toBe("April 2026");
    expect(months[2].label).toBe("January 2027");
  });

  it("includes the current month even when it has no rides", () => {
    const months = getRideMonths(events, new Date(2026, 8, 4)); // September, a gap in the schedule
    expect(months.map((m) => m.value)).toEqual(["2026-04", "2026-06", "2026-09", "2027-01"]);
  });

  it("returns an empty list when there are no rides", () => {
    expect(getRideMonths([], new Date(2026, 5, 1))).toEqual([]);
  });

  it("covers every month present in the real ride data", () => {
    const months = getRideMonths(rideEvents, new Date(2026, 5, 1));
    const monthsInData = new Set(rideEvents.map((e) => e.date.slice(0, 7)));
    for (const month of monthsInData) {
      expect(months.map((m) => m.value)).toContain(month);
    }
  });
});

describe("buildCalendarCells", () => {
  it("always returns a 42-cell grid", () => {
    expect(buildCalendarCells("2026-04", [])).toHaveLength(42);
    expect(buildCalendarCells("2026-02", [])).toHaveLength(42);
  });

  it("places the 1st in the correct Monday-start column (Apr 2026 = Wednesday)", () => {
    const cells = buildCalendarCells("2026-04", []);
    // Mon,Tue,Wed -> Wednesday is index 2; days before it are out-of-month.
    expect(cells[0].dayNumber).toBeNull();
    expect(cells[1].dayNumber).toBeNull();
    expect(cells[2].dayNumber).toBe(1);
    expect(cells[2].fullDate).toBe("2026-04-01");
  });

  it("counts the right number of in-month days (30/28/29)", () => {
    const inMonth = (m: string) => buildCalendarCells(m, []).filter((c) => c.dayNumber !== null);
    expect(inMonth("2026-04")).toHaveLength(30); // April
    expect(inMonth("2026-02")).toHaveLength(28); // non-leap February
    expect(inMonth("2024-02")).toHaveLength(29); // leap February
  });

  it("buckets each ride into its own day cell and leaves others empty", () => {
    const events = [ride({ id: "r", date: "2026-04-26" })];
    const cells = buildCalendarCells("2026-04", events);
    const target = cells.find((c) => c.fullDate === "2026-04-26");
    expect(target?.events.map((e) => e.id)).toEqual(["r"]);
    expect(cells.filter((c) => c.events.length > 0)).toHaveLength(1);
  });
});

describe("getInitialMonthIndex", () => {
  // Pinned to a date inside the season so `months` is the ride months alone.
  const months = getRideMonths(rideEvents, new Date(2026, 5, 1));

  it("opens on the current month", () => {
    const may = months.findIndex((m) => m.value === "2026-05");
    expect(getInitialMonthIndex(rideEvents, months, new Date(2026, 4, 15))).toBe(may);
  });

  it("opens on a current month that has no rides of its own", () => {
    const withGap = getRideMonths(rideEvents, new Date(2026, 9, 8)); // October
    const october = withGap.findIndex((m) => m.value === "2026-10");
    expect(october).toBeGreaterThan(-1);
    expect(getInitialMonthIndex(rideEvents, withGap, new Date(2026, 9, 8))).toBe(october);
  });

  it("falls back to the next upcoming ride when the current month is missing", () => {
    expect(getInitialMonthIndex(rideEvents, months, new Date(2026, 0, 1))).toBe(0);
  });

  it("clamps to the last month when today is after every listed month", () => {
    expect(getInitialMonthIndex(rideEvents, months, new Date(2026, 11, 1))).toBe(months.length - 1);
  });

  it("returns 0 when there are no months", () => {
    expect(getInitialMonthIndex([], [], new Date(2026, 5, 1))).toBe(0);
  });
});

describe("matchesFilters", () => {
  const event = ride({ id: "x", date: "2026-04-26", rideType: "Group ride", difficulty: "Intermediate", area: "Scarborough" });
  const all = { rideType: ALL_RIDE_TYPES, difficulty: ALL_DIFFICULTIES, area: ALL_AREAS, day: ANY_DAY };

  it("passes when every filter is the show-all sentinel", () => {
    expect(matchesFilters(event, all)).toBe(true);
  });

  it("filters by ride type, difficulty, and area", () => {
    expect(matchesFilters(event, { ...all, rideType: "Group ride" })).toBe(true);
    expect(matchesFilters(event, { ...all, rideType: "Race" })).toBe(false);
    expect(matchesFilters(event, { ...all, difficulty: "All levels" })).toBe(false);
    expect(matchesFilters(event, { ...all, area: "Scarborough" })).toBe(true);
  });

  it("filters by weekday name", () => {
    // 2026-04-26 is a Sunday.
    expect(matchesFilters(event, { ...all, day: "Sunday" })).toBe(true);
    expect(matchesFilters(event, { ...all, day: "Monday" })).toBe(false);
  });
});
