# Session Context

Updated: 2026-06-12

Last session state. Auto-updated by `team-lead/playbooks/complete-the-work.md`.

## Latest Session (2026-06-12, GA MCP go-live + portable journal kit)

Picked up the parked GA MCP and got it **working end-to-end**, then generalized the lesson into a
reusable journaling kit.

- **GA MCP LIVE:** abandoned the service-account ("robot") route — GA's add-user form kept
  rejecting the SA email and never cleared. Switched to **ADC user-login as the human admin**
  (`william.xhyin@gmail.com`, already a GA Administrator): created the user's **own** OAuth client
  (Desktop app), registered the `analytics.readonly` scope under the consent screen's **Data
  Access** (the final unlock), ran `gcloud auth application-default login --client-id-file=...`,
  and set the MCP `env` to `{}` so it auto-discovers the ADC file. Verified live:
  `get_account_summaries` returns TYCC account **396328696** / property **539644755** ("TYCC
  Toronto Website"). Deleted the SA key file; SA itself can be deleted in the Console.
- **Rewrote `knowledge/google-analytics-mcp-setup.md`** to lead with the working user-login method
  and demote the robot route to a "post-mortem / don't retry" footnote. Updated `MEMORY.md` +
  `CAPABILITY-STATUS.md` (GA → Verified/LIVE).
- **Created `project-journal-kit`** — a standalone sibling repo (`C:\Users\yinxi\source\repos\
  project-journal-kit`, first commit `a6f6f74`): a portable, dependency-free 5-file journaling
  template (BATON/STATE/KNOWLEDGE/decisions/RITUAL + README) distilling the good parts of
  `team-lead/` with no generator/scripts/links. For reuse across future projects.
- **Clarified ystack coupling:** confirmed tycc has **no live connection** to the ystack
  generator — only a path string in `PROVENANCE.md` + three opt-in sync scripts. No
  submodule/symlink/remote/dependency.
- **Security notes:** the user's OAuth *Desktop-app* client secret surfaced in chat — low
  sensitivity (unusable without the consent screen + test-user list); offered rotation steps,
  user opted to leave it. Credentials (OAuth client JSON, ADC file, the old SA key) all live
  off-repo under `C:\Users\yinxi\keys\` and are never committed.
- **Deployed + verified (after the first wrap):** merged branch → `main` (`afe8dc5`, green gate),
  pulled the first GA report (63 users / 703 views / 121 sessions, last 30d), then **verified the
  deploy end-to-end** — `gh` for the GitHub Actions side, `curl`+`grep` against the live JS bundle
  (all five per-route SEO descriptions present). Wrote `knowledge/verifying-a-deploy.md` (plain-
  language how-to) and **fixed a CI placement bug** (allowlist missing `team-lead/status/` →
  `CAPABILITY-STATUS.md` commits failed CI; re-synced). Built + tested an end-of-turn auto-commit
  Stop hook, then **removed it at the user's request**; kept the standing "I commit as I work with
  descriptive messages, never auto-push" behavior. Final `main` = `942cb2c`.

## Earlier Session (2026-06-11, SEO refine + explain-code skill + GA MCP wiring)

Three goals, all advanced; work committed on branch `codex/add-contact-phone-number` (NOT deployed
— `main` only auto-deploys). See `docs/sessions/2026-06-11-session-summary.md`.

- **SEO refine (done):** per-route title/description/canonical/OG/Twitter via a new
  `useSeo` hook that mutates the existing `index.html` head tags in place (avoids React 19
  hoisting duplicates). `src/shared/seo/{useSeo,routeMeta}.ts`, wired once in `PublicLayout` via
  `useLocation`; 404 now `noindex`; home description trimmed 171→157; 6 tests. Type-check + lint +
  27 tests + build all green. Pattern: `knowledge/seo-per-route-meta.md`.
- **`explain-code` skill (done):** new workspace skill at `team-lead/skills/explain-code/SKILL.md`
  (registered in `SKILLS-CUSTOM.md` + `AGENTS.md` routing). Produces *verified* code explanations
  (flow, contracts, invariants, guardrail gaps, verify commands) to drive vibe→engineering.
  Dogfooded on the new SEO module.
- **GA MCP (one step from done):** installed gcloud, user logged in, created project `tycc-ga-mcp`,
  enabled Analytics Data+Admin APIs, made service account + key (off-repo), registered the MCP.
  Key verified against the API. Only the GA-UI Viewer grant remains (the form kept rejecting the
  SA email). Full procedure + gotchas: `knowledge/google-analytics-mcp-setup.md`.

## Earlier Session (2026-06-02 → 06-04, content + media import + SEO + refinement)

Big multi-day production session, auto-deploying every change. Highlights:
- **Real stats** (8M+ views, ~1,500 IG, ~110 Discord); exec full names; Nathan bio refreshed.
- **Routes**: +Scarborough Bluffs, +Niagara Falls (~163 km); Tommy Thompson & L'Amoreaux
  waypoints fixed; "Road" → "Road cycling"; **one-way distances on all routes via BRouter**.
- **Gallery**: imported all 13 real photos from the club Google **Drive "WEBSITE MEDIA"** folder
  (HEIC→WebP, 54 MB→~5 MB, intrinsic dims for CLS); cleared the stock placeholders.
- **Hero** = the pavilion group shot (`hero.webp`); LCP `fetchPriority`; orange "Next ride" tag;
  About-us photo from `/raw`.
- **Calendar**: June 5 Scarborough Bluffs ride; opens on the next ride's month; improved Day view
  (day-picker + detail); dropped "Ontario Cycling"; eyebrow "2026 season". (A mobile→List default
  was **reverted by the user**; calendar now always opens Month.)
- **SEO**: description, canonical, OG/Twitter cards + generated `og-image.jpg`, `robots.txt`,
  `sitemap.xml`, JSON-LD; SWA fallback exclude updated. On-brand **404**.
- **Scheduled** a remote agent to set Nathan's school → Western on 2026-09-01.
- Installed the **Google Analytics MCP** (`analytics-mcp` via pipx) — **parked** pending GA
  access/credentials (see active-blockers). Drafted an Instagram launch caption.
- New/updated knowledge: `media-and-route-pipelines.md`, `visual-verification-windows.md`.

## Previous Session (2026-05-31, add Wonderland route)

Added a fourth club route to `routeList` in `webui/src/shared/tycc/content.ts`:
"York Mills → Canada's Wonderland" (id `york-mills-canadas-wonderland`, type Road),
built from a user-pasted Google Maps bicycling URL (808 York Mills Rd → 4 GPS
waypoints → Canada's Wonderland). Converted to the project's two URL formats
(`mapsUrl` directions link + `dirflg=b` `embedUrl` iframe), apostrophe encoded as
`%27`, placed right after the G Ross Lord route (which already cites Wonderland as
an extension). type-check + lint green. Committed `08c4741`, pushed to `origin/main`
(auto-deploy). See `docs/sessions/2026-05-31-session-summary-3.md`.

## Earlier Session (2026-05-31, copy polish)

Removed an AI-sounding placeholder line from the MonthCalendar side card
("Designed for fast scanning on mobile, with the day details always available."),
along with its now-empty wrapper `<div>` and the then-unused `MapPinned` import in
`webui/src/shared/tycc/components/MonthCalendar.tsx`. type-check + lint green.
This followed a run of same-day commits (2026 season rides, green→black wordmark,
favicon dark-mode + sizing fixes, Tommy Thompson route GPS + Longo's meetup) already
on `origin/main`.

## Last Session Summary

**Date**: 2026-05-30 → 2026-05-31
**Work**: Full UI/UX redesign of the TYCC public site, driven by the club's real content
(meeting minutes + exec write-up in `/raw`) and two reference sites (Ontario Cycling, NICA).
**Outcome**: Four pages rebuilt — Home, About, Routes, and a new Gallery — on a white-dominant,
amber-forward palette, with the real logo, real exec photos/bios, and real social-proof stats.
Most of it has since been pushed to `origin/main` and a Google Analytics 4 PR was merged in
(reconciled into local main via merge commit). Local is now ahead 1 (the branded-email TODO).
**Key changes**:
- Brand: real cyclist logo (white bg made transparent), amber-forward theme, "Ride with us." hero.
- Header: logo + nav (About/Calendar/Routes/Gallery) + mobile hamburger + amber Instagram &
  blue-on-amber Discord icon buttons. Footer: kept minimal + added copyright line.
- Home: photo hero, next-ride block (auto-hides when none), real founding story, "by the
  numbers" stat band, road-forward "how we ride", kept calendar, team teaser (incl. William).
- About: story, mission/vision, execs 2-per-row, click-to-expand bios; placeholder avatar +
  "Bio coming soon" for members without photo/bio (William = Developer & Exec, no photo yet).
- Routes: card-driven Google Maps embeds of 3 real club routes (no tab switcher).
- Calendar: kept component; fixed stale default selection; only-upcoming logic on homepage.
- Reviews section removed; achievements folded into the numbers.
- Fixed: staticwebapp.config.json moved to public/ so builds don't wipe it.
- Real blue Discord brand logo (`/discord.png`) used consistently: header, footer, mobile menu,
  homepage Connect card. Amber Instagram + blue-on-amber Discord icon buttons in the header.
- Google Analytics 4 (added via PR on origin) reconciled into local main.
**Verified**: `npm run type-check`, `npm run lint`, `npm test` (21 pass), `npm run build` all green.

## Open Items From Last Session

- Execs want to **change the stats numbers** (current 1.2M / ~1,000 / ~90 / 13–25 are placeholders).
- Swap stock hero/gallery photos (and add gallery video) for the club's real media when provided.
- William's photo + bio to be added later.
- Decide Discord→calendar bot approach: `/ride` slash command (recommended) vs AI-reads-posts.
  Google Calendar option was rejected. Exec writeup was drafted and shared.
- Routes: hide Google's alternative-route lines via a Google My Maps embed (waiting on the club
  to build the My Maps; `routesMyMapsEmbedUrl` hook scoped).
- Decide when to **push `main`** (auto-deploys to Azure) so execs can review live.
- **Talk to the execs about the waiver** (ride sign-up + waiver flow, from Session 2 minutes) and
  the **review form** (removed from the redesign; re-add when ready). Tracked in `team-lead/TODOS.md`.
- **Set up a branded `@tycctoronto.com` mailbox** and switch `site.email` off the Gmail address.
- Push the remaining local commit (branded-email TODO) when convenient; origin already auto-deploys.
- **Site is LIVE and verified** on tycctoronto.com (all pages + assets HTTP 200; Azure deploy success).
- Working mode is now **direct-to-production** (commit + push to main = deploy).
- **Real exec media received** in `/raw/everything I am given from the execs/` (drive dump of
  clips + `Photos-3-001.zip` + content docs) — to be extracted/optimized and wired in later.
