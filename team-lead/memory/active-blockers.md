# Active Blockers

Updated: 2026-06-12

Known blockers, work in progress, and unresolved items. Clear entries when resolved.

## Current

- **William's photo + bio** still pending (placeholder "W" card). Other execs done.
- Gallery video deferred (storage); photos-only for now. (Real stat numbers + real gallery/hero
  photos are now DONE — gallery built from the Drive "WEBSITE MEDIA" folder.)
- Discord→calendar **bot approach undecided** (`/ride` command vs AI-reads-posts); exec
  writeup shared, awaiting their pick.
- **Deploy still pending:** the 2026-06-11 SEO + `explain-code` work is committed on branch
  `codex/add-contact-phone-number`, NOT merged to `main` (so NOT deployed). Merging also ships the
  unrelated "add contact phone number" commit — do it supervised.

## Resolved this session (2026-06-12)

- ✅ **Google Analytics MCP — LIVE.** `get_account_summaries` returns TYCC (`396328696` /
  property `539644755`). The service-account ("robot") route was **abandoned** — the GA add-user
  form kept rejecting the SA email and never cleared. Switched to **ADC user-login as the human
  admin** (`william.xhyin@gmail.com`, already a GA Administrator): own OAuth client (Desktop app),
  `analytics.readonly` scope **registered under the consent screen's Data Access** (the final
  unlock), `gcloud auth application-default login --client-id-file=...`, and the MCP env set to
  `{}` so it auto-uses the ADC file. The SA + key were deleted. Full procedure + gotchas:
  `knowledge/google-analytics-mcp-setup.md`.

## Watch List

- Routes map shows Google's greyed **alternative-route lines**; fix needs a Google My Maps
  "Embed on my site" link from the club (`routesMyMapsEmbedUrl` hook is scoped, not wired).
- Working directly on production now: commit + push to `main` by default (auto-deploys to
  tycctoronto.com). Keep `main` green before pushing (type-check, lint, tests, build).
- Some exec bios still say "co-president" in their own words while role badges read
  Co-founder/Exec; execs may want to reconcile.
- Backend/auth (OIDC) still unstarted; site remains frontend-only (intentional for now).
