# Session: Remove AI-sounding copy from calendar side card
Date: 2026-05-31
Worked on: webui/src/shared/tycc/components/MonthCalendar.tsx

## Context

The MonthCalendar event side card ended with a line of generic marketing copy —
"Designed for fast scanning on mobile, with the day details always available." —
that read as AI-generated filler rather than real content.

## What I did

- Removed the sentence and the `<div>` that existed only to render it (the row had
  a `MapPinned` icon + the text and no other purpose).
- Dropped the now-unused `MapPinned` import from `lucide-react`.
- Verified `npm run type-check` and `npm run lint` both pass clean.

## Key decisions

- Removed the whole wrapper `div` rather than just the text, since the element had no
  remaining content or function.

## What was learned and saved

- No durable knowledge note — trivial copy/markup cleanup. Captured in session-context.md.

## Next session priorities

- Unchanged from prior baton pass: integrate real exec media, get real stat numbers,
  pick the Discord `/ride` bot, set up branded email, raise waiver + review form with execs.
