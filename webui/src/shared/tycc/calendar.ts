import type { RideEvent } from "./types";

/** Filter sentinels — the "show everything" option for each calendar filter. */
export const ALL_RIDE_TYPES = "All rides";
export const ALL_DIFFICULTIES = "All difficulties";
export const ALL_AREAS = "All areas";
export const ANY_DAY = "Any day";

export type MonthOption = {
  label: string;
  /** "YYYY-MM" */
  value: string;
};

export type CalendarCell = {
  id: string;
  dayNumber: number | null;
  fullDate: string | null;
  events: RideEvent[];
};

export type RideFilters = {
  rideType: string;
  difficulty: string;
  area: string;
  day: string;
};

/** Human label ("April 2026") for a "YYYY-MM" month value. */
export const formatMonthLabel = (monthValue: string): string => {
  const [year, month] = monthValue.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric" }).format(
    new Date(year, month - 1, 1),
  );
};

/** Weekday name ("Monday") for a "YYYY-MM-DD" date, pinned to local noon to dodge UTC shift. */
export const formatDayName = (date: string): string =>
  new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date(`${date}T12:00:00`));

/**
 * The distinct months that actually have rides, chronological, each with a
 * display label. Derived from the ride data so the calendar never silently
 * drops a ride scheduled outside a hardcoded window.
 */
export const getRideMonths = (events: RideEvent[]): MonthOption[] =>
  [...new Set(events.map((event) => event.date.slice(0, 7)))]
    .sort()
    .map((value) => ({ value, label: formatMonthLabel(value) }));

/**
 * Index (into `months`) of the month to open on: the month of the next upcoming
 * ride, falling back to the current month, clamped into the available range.
 * Returns 0 when there are no months.
 */
export const getInitialMonthIndex = (
  events: RideEvent[],
  months: MonthOption[],
  now: Date = new Date(),
): number => {
  if (months.length === 0) return 0;
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .find((event) => event.date >= today);
  const targetMonth = (upcoming?.date ?? today).slice(0, 7);
  const idx = months.findIndex((month) => month.value === targetMonth);
  if (idx !== -1) return idx;
  return targetMonth < months[0].value ? 0 : months.length - 1;
};

/**
 * A 42-cell (6-week) Monday-start grid for the given month, with each ride
 * bucketed into its day. Out-of-month cells carry a null day and no events.
 */
export const buildCalendarCells = (monthValue: string, events: RideEvent[]): CalendarCell[] => {
  const [year, month] = monthValue.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const mondayStartOffset = (firstDay.getDay() + 6) % 7;

  return Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - mondayStartOffset + 1;
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;

    if (!isCurrentMonth) {
      return {
        id: `empty-${monthValue}-${index}`,
        dayNumber: null,
        fullDate: null,
        events: [],
      };
    }

    const fullDate = `${monthValue}-${String(dayNumber).padStart(2, "0")}`;

    return {
      id: fullDate,
      dayNumber,
      fullDate,
      events: events.filter((event) => event.date === fullDate),
    };
  });
};

/** Whether a ride passes the active filter selection (sentinels mean "no filter"). */
export const matchesFilters = (event: RideEvent, filters: RideFilters): boolean => {
  if (filters.rideType !== ALL_RIDE_TYPES && event.rideType !== filters.rideType) return false;
  if (filters.difficulty !== ALL_DIFFICULTIES && event.difficulty !== filters.difficulty)
    return false;
  if (filters.area !== ALL_AREAS && event.area !== filters.area) return false;
  if (filters.day !== ANY_DAY && formatDayName(event.date) !== filters.day) return false;
  return true;
};
