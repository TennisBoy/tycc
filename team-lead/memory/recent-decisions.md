# Recent Decisions

Updated: 2026-05-31

Decisions made in recent sessions. Remove entries older than ~2 sprints.

## 2026-05-30/31 (redesign)

- Full redesign, but **keep** the calendar component, the green/amber color family, and the
  minimal footer. Flip the palette to white-dominant with **amber leading, green secondary**.
- All copy must come from the club's **real** material (`/raw`); no AI-invented marketing copy.
- Hero voice locked to "Ride with us." + the verbatim mission; left-aligned text on a road photo.
- Draw design cues from Ontario Cycling (minimal big-photo hero) + NICA (mission-as-headline);
  skip pure Google Maps for routes.
- Routes use free Google Maps directions embeds, **card-driven** (no tab switcher); a Google
  My Maps embed is the planned fix for hiding alternative-route lines (Strava deferred — needs sub).
- Reviews section removed (no real reviews yet); achievements folded into the stats.
- Team: roles set by hand — Nathan/Roger/Gavin = Co-founder, Cooper = Exec, William = Developer
  & Exec (no photo/bio yet). Members can exist without a photo/bio (placeholder avatar).
- Homepage shows only the next **upcoming** ride; past rides stay only in the calendar.
- Discord→calendar bot: prefer a `/ride` slash command over AI-reading free-form posts;
  Google Calendar option rejected. (Not yet built — pending exec decision.)
- Branch `redesign-first-draft` was fast-forward merged to `main`. The redesign was later pushed
  to origin and a Google Analytics 4 PR merged in (reconciled via merge into local main).
- Use the real blue Discord brand logo (`/discord.png`) everywhere Discord appears (header,
  footer, mobile menu, connect card), not the generic chat icon.

## 2026-04-18 (session 2)

- Use May 2026 for first sample ride since `MonthCalendar` only renders May–June 2026.
- Keep ride details Toronto-specific to set a realistic precedent for future entries.

## 2026-04-18 (session 1)

- Use the homepage foundation as the first implementation slice before backend setup.
- Keep the first route public and let the site render even if OIDC is not configured yet.
- Establish the initial TYCC brand direction around club navy, high-vis gold, and ride red.
