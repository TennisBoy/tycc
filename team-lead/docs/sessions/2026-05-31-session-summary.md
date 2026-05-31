# Session: TYCC public site full redesign

Date: 2026-05-31
Worked on: webui (Home, About, Routes, Gallery, layout, theme, content, calendar), brand assets

## Context

The previous site read as an unfinished scaffold with AI-invented copy, a stock hero, no mobile
navigation, and developer placeholder text visible to real visitors. The user (William, an exec
who proposed the site to build the club's credibility) asked for a full redesign grounded in the
club's real material and two reference sites, keeping the calendar and the green/amber color family.

## What I did

- Brainstormed the redesign with the superpowers visual companion + AskUserQuestion; sourced real
  content from `/raw` (meeting minutes + exec write-up) and screenshotted the two reference sites
  (Ontario Cycling, NICA).
- Rebuilt the site on a white-dominant, amber-forward palette:
  - **Home**: road-photo hero ("Ride with us." + verbatim mission), next-ride block (auto-hides
    when none, shows only the next *upcoming* ride), real founding story, "by the numbers" stat
    band, road-forward "how we ride", kept calendar, team teaser, connect band.
  - **About**: story, mission/vision, execs 2-per-row with click-to-expand bios; lettered-avatar
    placeholder + "Bio coming soon" for members without a photo/bio.
  - **Routes**: card-driven Google Maps embeds of 3 real club routes (no API key, no tab switcher).
  - **Gallery** (new nav): photo grid + lightbox (stock placeholders).
  - Header: real (transparent) logo, mobile hamburger, amber Instagram + blue-on-amber Discord
    icon buttons. Footer: kept minimal + copyright line.
- Added ride-scheduling helpers (`rides.ts`) + tests; fixed the calendar's stale default selection;
  fixed the Azure `staticwebapp.config.json` (moved to `public/` so builds stop deleting it).
- Committed in logical units; merged `redesign-first-draft` → `main` (ff). Iterated on user
  feedback (icon-only Discord → blue logo, bigger team cards, stat band, William added, etc.).
- Drafted an exec-facing explainer for a future Discord→calendar bot.

## Key decisions

- Keep the calendar component, green/amber family, and minimal footer; flip palette to
  white-dominant, amber-leading.
- No AI-invented copy — everything from the club's real material.
- Routes via free Google Maps directions embeds; Google My Maps is the planned fix for hiding
  alternative-route lines (Strava deferred; pure Google Calendar rejected for the bot).
- Discord bot: prefer a `/ride` slash command over AI-reading free-form posts (not built yet).
- Do not push `main` yet — pushing auto-deploys to Azure; hold for exec review.

## What was learned and saved

- `knowledge/tycc-site-patterns.md` — content model, optional exec photo/bio, upcoming-ride logic,
  routes embed limitation, staticwebapp.config deploy gotcha.
- `knowledge/visual-verification-windows.md` — Playwright-via-npx-cache + PIL screenshot/image
  workflow on this Windows box.

## Next session priorities

- Swap in execs' real stat numbers and real photos/video; add William's photo/bio.
- Decide + build the Discord→calendar bot (`/ride` command recommended).
- Wire a Google My Maps embed for Routes to drop the alternative-route lines.
- Push `main` to deploy to Azure once execs approve.
