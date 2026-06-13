import type { RideEvent } from "./types";

/**
 * Parse a ride's date + time into a Date at the ride's START time.
 *
 * `time` may be a single time ("9:00 AM"), a range ("2:45 PM – 4:00 PM"), or a
 * time with a trailing note ("7:00 AM roll out"); we read the leading time token
 * and ignore the rest. Falls back to end-of-day if no time can be parsed, so an
 * unparseable time sorts last within its day.
 *
 * The Date is intentionally built in LOCAL time: the club is single-timezone
 * (Toronto), and local construction sidesteps the UTC date-shift off-by-one.
 * Don't "fix" this to UTC.
 */
export const getRideStart = (event: RideEvent): Date => {
  const [year, month, day] = event.date.split("-").map(Number);
  const match = event.time.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)?/i);

  let hours = 23;
  let minutes = 59;
  if (match) {
    hours = Number(match[1]);
    minutes = Number(match[2]);
    const meridiem = match[3]?.toLowerCase();
    if (meridiem === "pm" && hours < 12) hours += 12;
    if (meridiem === "am" && hours === 12) hours = 0;
  }

  return new Date(year, (month ?? 1) - 1, day ?? 1, hours, minutes, 0, 0);
};

/**
 * The local end of a ride's date. A ride stays "upcoming" for the whole of its
 * date: it shouldn't drop off the homepage the moment it starts (or ends), only
 * once the day itself is over.
 */
const getRideDayEnd = (event: RideEvent): Date => {
  const [year, month, day] = event.date.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1, 23, 59, 59, 999);
};

/** Rides happening today or later, soonest start first. */
export const getUpcomingRides = (events: RideEvent[], now: Date = new Date()): RideEvent[] =>
  events
    .filter((event) => getRideDayEnd(event).getTime() >= now.getTime())
    .sort((a, b) => getRideStart(a).getTime() - getRideStart(b).getTime());

/** The soonest upcoming ride, or null once every ride's date has passed. */
export const getNextRide = (events: RideEvent[], now: Date = new Date()): RideEvent | null =>
  getUpcomingRides(events, now)[0] ?? null;
