# Active Blockers

Updated: 2026-05-31

Known blockers, work in progress, and unresolved items. Clear entries when resolved.

## Current

- Waiting on execs for **real stat numbers** (current figures are placeholders).
- Waiting on the club's **real photos/video** to replace stock hero + gallery images, and
  William's photo/bio.
- Discord→calendar **bot approach undecided** (`/ride` command vs AI-reads-posts); exec
  writeup shared, awaiting their pick.

## Watch List

- Routes map shows Google's greyed **alternative-route lines**; fix needs a Google My Maps
  "Embed on my site" link from the club (`routesMyMapsEmbedUrl` hook is scoped, not wired).
- Working directly on production now: commit + push to `main` by default (auto-deploys to
  tycctoronto.com). Keep `main` green before pushing (type-check, lint, tests, build).
- Some exec bios still say "co-president" in their own words while role badges read
  Co-founder/Exec; execs may want to reconcile.
- Backend/auth (OIDC) still unstarted; site remains frontend-only (intentional for now).
