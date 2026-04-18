# Session: First Sample Ride on Calendar
Date: 2026-04-18
Worked on: webui/src/shared/tycc/content.ts, webui/src/features/public/pages/CalendarPage.tsx

## Context

The TYCC ride calendar page existed but showed an empty `rideEvents` array and placeholder copy saying "no public events posted yet." The goal was to add a real-looking sample ride so the calendar has visible content.

## What I did

- Added the first `RideEvent` entry ("Don Valley Morning Loop") to `rideEvents` in `content.ts`:
  - Date: May 10, 2026 at 9:00 AM
  - Type: Group ride, All levels, 28 km
  - Meetup: Serena Gundy Park, Eglinton Ave E
  - Full `preview` and `gear` fields populated
- Updated `CalendarPage.tsx` heading and subtext from "no events" placeholder copy to reflect that a ride is now on the calendar.
- Verified with `tsc --noEmit` — zero errors.

## Key decisions

- Used May 2026 as the date since the `MonthCalendar` component only renders May and June 2026.
- Kept the ride realistic and Toronto-specific (Don Valley trails) to set a good precedent for future entries.

## What was learned and saved

- `content.ts` is the single source of truth for all calendar events — adding a `RideEvent` object there is sufficient to populate the calendar.
- The `RideEvent` type requires: id, title, date (YYYY-MM-DD), time, rideType, difficulty, area, meetup, distance, preview, gear.

## Next session priorities

- Add more ride dates for May/June 2026 as the schedule is confirmed.
- Update `MONTHS` in `MonthCalendar.tsx` if future months beyond June 2026 need to be shown.
- Decide real join/contact CTA path for the homepage.
