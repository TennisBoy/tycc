# Active Blockers

Updated: 2026-06-03

Known blockers, work in progress, and unresolved items. Clear entries when resolved.

## Current

- Waiting on execs for **real stat numbers** (current figures are placeholders).
- **Real photos/video received** (in `/raw/everything I am given from the execs/`) — needs
  extracting/optimizing before replacing the stock hero + gallery images. William's photo/bio
  still pending.
- Discord→calendar **bot approach undecided** (`/ride` command vs AI-reads-posts); exec
  writeup shared, awaiting their pick.
- **Google Analytics MCP — parked, blocked on GA access.** The `analytics-mcp` package
  (Google's `googleanalytics/google-analytics-mcp`, v0.6.0) is already installed locally via
  pipx at `C:\Users\yinxi\.local\bin\analytics-mcp.exe`. NOT yet registered in Claude (no
  broken config left behind). To finish: (1) GA4 property owner must grant read access — add
  the user to the property, or add a service-account email as **Viewer**; (2) need a Google
  Cloud **project ID** + a **credentials JSON** (service-account key, or `gcloud` ADC) with the
  Analytics **Admin API** + **Data API** enabled; (3) then run:
  `claude mcp add analytics-mcp -s local -e GOOGLE_APPLICATION_CREDENTIALS="<path-to-json>" -e GOOGLE_PROJECT_ID="<project-id>" -- "C:\Users\yinxi\.local\bin\analytics-mcp.exe"`.
  Blocker: user does not currently own/control the project's Google Analytics.

## Watch List

- Routes map shows Google's greyed **alternative-route lines**; fix needs a Google My Maps
  "Embed on my site" link from the club (`routesMyMapsEmbedUrl` hook is scoped, not wired).
- Working directly on production now: commit + push to `main` by default (auto-deploys to
  tycctoronto.com). Keep `main` green before pushing (type-check, lint, tests, build).
- Some exec bios still say "co-president" in their own words while role badges read
  Co-founder/Exec; execs may want to reconcile.
- Backend/auth (OIDC) still unstarted; site remains frontend-only (intentional for now).
