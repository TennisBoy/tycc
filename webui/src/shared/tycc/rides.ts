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
 * The local end time of a ride: the end of its time range when one is given
 * ("2:45 PM – 4:00 PM" → 4:00 PM), otherwise the end of the ride's day for
 * open-ended times ("7:00 AM roll out"). A ride counts as upcoming until this
 * moment — so it shows before and during the ride, then rolls off once it ends.
 */
const getRideEnd = (event: RideEvent): Date => {
  const [year, month, day] = event.date.split("-").map(Number);
  const monthIndex = (month ?? 1) - 1;
  const times = [...event.time.matchAll(/(\d{1,2}):(\d{2})\s*(am|pm)?/gi)];
  const end = times.length >= 2 ? times[times.length - 1] : null;
  if (!end) {
    return new Date(year, monthIndex, day ?? 1, 23, 59, 59, 999);
  }

  let hours = Number(end[1]);
  const minutes = Number(end[2]);
  const meridiem = end[3]?.toLowerCase();
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  return new Date(year, monthIndex, day ?? 1, hours, minutes, 0, 0);
};

/** Rides that haven't ended yet, soonest start first. */
export const getUpcomingRides = (events: RideEvent[], now: Date = new Date()): RideEvent[] =>
  events
    .filter((event) => getRideEnd(event).getTime() >= now.getTime())
    .sort((a, b) => getRideStart(a).getTime() - getRideStart(b).getTime());

/** The soonest ride that hasn't ended yet, or null once every ride is over. */
export const getNextRide = (events: RideEvent[], now: Date = new Date()): RideEvent | null =>
  getUpcomingRides(events, now)[0] ?? null;
