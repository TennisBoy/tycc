# Active Blockers

Updated: 2026-06-11

Known blockers, work in progress, and unresolved items. Clear entries when resolved.

## Current

- **William's photo + bio** still pending (placeholder "W" card). Other execs done.
- Gallery video deferred (storage); photos-only for now. (Real stat numbers + real gallery/hero
  photos are now DONE — gallery built from the Drive "WEBSITE MEDIA" folder.)
- Discord→calendar **bot approach undecided** (`/ride` command vs AI-reads-posts); exec
  writeup shared, awaiting their pick.
- **Google Analytics MCP — ONE step from done (2026-06-11).** Everything technical is built and
  verified: gcloud installed; user logged in (`william.xhyin@gmail.com`, **Administrator** on GA
  account **396328696**); project `tycc-ga-mcp` created; Analytics **Data + Admin APIs** enabled;
  service account `ga-mcp@tycc-ga-mcp.iam.gserviceaccount.com` created with key at
  `C:\Users\yinxi\keys\ga-mcp-key.json` (off-repo); MCP registered as `google-analytics` (local
  scope, in `~/.claude.json`). Key verified against the Admin API — authenticates fine, just has
  no GA access yet. **Only remaining step:** add the SA email as a **Viewer** in GA (Admin →
  Account access management → +). That form kept failing with *"This email doesn't match a Google
  Account"* (>15 min) — retry in an **Incognito** window signed in as only the GA-admin account,
  typing (not pasting) the email. Then restart Claude / `/mcp` and verify with a live metric.
  Full procedure + gotchas: `knowledge/google-analytics-mcp-setup.md`. Plan B if the grant keeps
  failing: own-OAuth-client + user login (skips the GA form). Decision: stick with the service
  account (robot) method.

## Watch List

- Routes map shows Google's greyed **alternative-route lines**; fix needs a Google My Maps
  "Embed on my site" link from the club (`routesMyMapsEmbedUrl` hook is scoped, not wired).
- Working directly on production now: commit + push to `main` by default (auto-deploys to
  tycctoronto.com). Keep `main` green before pushing (type-check, lint, tests, build).
- Some exec bios still say "co-president" in their own words while role badges read
  Co-founder/Exec; execs may want to reconcile.
- Backend/auth (OIDC) still unstarted; site remains frontend-only (intentional for now).
