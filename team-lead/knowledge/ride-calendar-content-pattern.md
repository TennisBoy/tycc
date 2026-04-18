# Ride Calendar Content Pattern

## How to add a ride event

All ride calendar events are stored as `RideEvent[]` in:

```
webui/src/shared/tycc/content.ts  →  export const rideEvents
```

Adding an object to this array is the only change needed to put a ride on the calendar.

## RideEvent shape

```ts
type RideEvent = {
  id: string;           // e.g. "ride-2026-05-10"
  title: string;
  date: string;         // "YYYY-MM-DD" — must fall within a month listed in MonthCalendar MONTHS
  time: string;         // e.g. "9:00 AM"
  rideType: "Group ride" | "Skills session" | "Community ride" | "Fundraiser";
  difficulty: "Beginner" | "All levels" | "Intermediate";
  area: string;
  meetup: string;
  distance: string;
  preview: string;
  gear: string;
};
```

## Calendar month range

`MonthCalendar.tsx` hardcodes the navigable months:

```ts
const MONTHS: MonthOption[] = [
  { label: "May 2026", value: "2026-05" },
  { label: "June 2026", value: "2026-06" },
];
```

Events outside this range will not appear. Update this array when the schedule extends further.

## CalendarPage copy

`webui/src/features/public/pages/CalendarPage.tsx` contains the heading/subtext above the calendar. Update it to match the actual publication state (empty vs. has rides).
