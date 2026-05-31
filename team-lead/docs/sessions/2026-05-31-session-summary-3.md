# Session: Add York Mills → Canada's Wonderland route
Date: 2026-05-31
Worked on: webui/src/shared/tycc/content.ts (routeList)

## Context

The user pasted a Google Maps bicycling directions URL (808 York Mills Rd →
4 GPS waypoints → Canada's Wonderland, Vaughan) and asked to add it as a new
club route on the Routes page.

## What I did

- Decoded the pasted URL (mode `3e1` = bicycling) and confirmed intent (add as a
  new route) before editing.
- Appended a fourth `RouteInfo` entry to `routeList` in `content.ts`:
  - id `york-mills-canadas-wonderland`, title "York Mills → Canada's Wonderland",
    type Road.
  - Converted the pasted link into the project's two required formats: a
    click-through `mapsUrl` (`/maps/dir/.../data=!4m2!4m1!3e1`) and an iframe
    `embedUrl` (`maps.google.com/maps?saddr=...&daddr=...+to:...&dirflg=b&output=embed`),
    preserving all 4 GPS waypoints + start + end.
  - URL-encoded the apostrophe in "Canada's" as `%27`, matching the existing
    `L%27Amoreaux` entry. Dropped the URL's camera/zoom params (`@...,1426m,3d`)
    since they describe the map view, not the route.
- Placed it right after "North York → G Ross Lord Park", which already mentions
  Wonderland as a possible extension, so the two read as a pair.
- Verified: `npm run type-check` (tsc, no errors) + `npm run lint` (eslint) green.
- Committed (`08c4741`) and pushed to `origin/main` → Azure auto-deploy.

## Key decisions

- Type = Road (consistent with the other three routes; no gravel/trail info given).
- Followed the existing `embedUrl`/`mapsUrl` URL conventions exactly rather than
  embedding the raw pasted URL — the raw "place" URL form renders Google's
  alternative-route clutter and doesn't fit the iframe pattern.
- Did not commit until the user explicitly said "push to production" (repo is
  direct-to-production: push to main = deploy).

## What was learned and saved

- Route-URL conversion recipe is now reused/confirmed across routes (see the
  earlier Tommy Thompson route fix). The two-format pattern in `content.ts`
  (`mapsUrl` directions link + `embedUrl` `dirflg=b` iframe) is the established
  way to add a club route.

## Next session priorities

- Unchanged from prior baton pass: integrate real exec media from `/raw/`,
  replace placeholder stat numbers, pick the Discord `/ride` bot approach, set up
  the branded `@tycctoronto.com` mailbox, raise waiver + review form with execs.
