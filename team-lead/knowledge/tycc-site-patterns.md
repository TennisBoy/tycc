# TYCC Site Patterns (post-redesign)

Durable patterns established during the 2026-05 full redesign of the TYCC public site.

## Content is real and centralized

- All site content lives in `webui/src/shared/tycc/content.ts` — the single source of truth
  (mission, vision, story, stats, execs, routes, gallery, connect links, rideEvents).
- Copy is sourced from the club's **real** material dropped in `/raw` (meeting minutes +
  "tycc website description.md"). Do **not** invent marketing copy — past AI-written filler
  ("practical enough for parents…") was explicitly rejected.
- The mission/vision strings are the committee's exact wording.

## Exec / team model supports missing assets

- `Exec` type (`shared/tycc/types.ts`) has `photo?`, `bio?`, `school?` all optional, and
  `role: string` (free text, e.g. "Co-founder", "Exec", "Developer & Exec").
- Renderers (AboutPage, HomePage teaser) fall back to a lettered avatar when `photo` is
  absent, show "Bio coming soon" (non-clickable card) when `bio` is absent, and hide the
  school line when absent. So a member can be added before their photo/bio exists.

## Upcoming-ride logic

- `shared/tycc/rides.ts`: `getRideStart` / `getUpcomingRides` / `getNextRide` parse a ride's
  `date` + `time` ("9:00 AM") into a Date.
- Homepage shows only the **soonest upcoming** ride (`getNextRide`) and hides the next-ride
  block entirely when nothing is scheduled; the calendar still shows ALL rides (past + future).
- Covered by `rides.test.ts`.

## Routes = Google Maps (no API key, no map fees)

- Each route in `routeList` has a `mapsUrl` (full directions link) + `embedUrl`
  (`maps.google.com/maps?saddr=…&daddr=…&dirflg=b&output=embed`, `+to:` for waypoints).
- The Routes page map is **driven by the route cards** (click a card → map swaps); there is
  no separate tab switcher.
- KNOWN LIMITATION: the free Google **directions** embed always shows greyed *alternative
  routes* — there is no parameter to hide them. The clean fix is a Google **My Maps**
  "Embed on my site" link (`maps/d/embed?mid=…`), which renders only the drawn route. A
  `routesMyMapsEmbedUrl` hook was scoped for this but not yet wired (waiting on the club to
  build the My Maps).

## Deploy gotcha: staticwebapp.config.json belongs in public/

- The Azure SWA navigation-fallback config must live in `webui/public/staticwebapp.config.json`
  so Vite copies it into `dist` on every build. It was previously committed directly in
  `dist/`, so every `vite build` deleted it and broke deep links (/about, /routes, /gallery).

## Theme

- Palette is white-dominant, **amber (#f2a93b) leads**, green (#1e6b52) is the lighter touch.
  Tokens in `webui/src/styles/globals.css`. The calendar component and minimal footer were
  kept deliberately.
