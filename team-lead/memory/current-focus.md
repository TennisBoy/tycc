# Current Focus

Updated: 2026-06-11

## Active Work

- Site is **live on tycctoronto.com** (direct-to-production via `main`). The 2026-06-11 work
  (SEO per-route meta, `explain-code` skill) is **committed on branch
  `codex/add-contact-phone-number` but NOT yet deployed** — merging to `main` is the pending
  deploy step (also ships the "add contact phone number" commit; do it supervised).
- **GA MCP is one GA-UI grant from working** — see active-blockers + `knowledge/google-analytics-mcp-setup.md`.

## Recent Completions

- **2026-06-11:** Per-route SEO meta (`src/shared/seo/`, wired in `PublicLayout`, 404 `noindex`,
  6 tests); `explain-code` workspace skill; GA MCP fully wired except the GA Viewer grant.
- Real stats, exec full names, refreshed Nathan bio.
- Routes: added Scarborough Bluffs + Niagara Falls; fixed Tommy Thompson/L'Amoreaux waypoints;
  one-way distances on all routes (BRouter); "Road cycling" label.
- Gallery rebuilt from the club Google Drive "WEBSITE MEDIA" folder (HEIC→WebP, compressed).
- New hero (pavilion shot); orange next-ride tag; About-us photo.
- Calendar: June 5 ride; opens on next ride's month; improved Day view; copy fixes.
- SEO batch (meta/OG/Twitter/og-image/robots/sitemap/JSON-LD) + on-brand 404.
- Installed Google Analytics MCP (`analytics-mcp`) — wiring parked pending GA access.
- Drafted an Instagram launch announcement caption.

## Up Next

- **Finish GA MCP:** add SA `ga-mcp@tycc-ga-mcp.iam.gserviceaccount.com` as a GA **Viewer**
  (Incognito, single account, type the email), then restart Claude / `/mcp` and verify a live metric.
- **Deploy the 2026-06-11 work:** merge `codex/add-contact-phone-number` → `main` (supervised;
  also ships the contact-phone commit), or cherry-pick the SEO/skill commit.
- **Reconcile exec titles** (Co-founder/Exec vs "co-president" in bios); add **William's photo/bio**.
- Confirm **apex vs www** for canonical/OG URLs.
- Discord→calendar bot approach still undecided.
- Once the launch post drives traffic, use GA to guide further refinement.
