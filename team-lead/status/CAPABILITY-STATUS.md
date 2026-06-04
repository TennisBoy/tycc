# Capability Status

## Legend

- Proposed
- In progress
- Implemented
- Verified
- Deferred

## Capabilities

| Capability | Status | Notes |
|---|---|---|
| Public site — Home | Verified | Redesigned; hero, next-ride (upcoming-only), story, stats, calendar, team, connect |
| Public site — About | Verified | Story, mission/vision, execs 2-per-row with expandable bios |
| Public site — Routes | Verified | 6 card-driven Google Maps embeds; one-way distances (BRouter) on each card; alt-line hiding still pending My Maps |
| Public site — Gallery | Verified | 11 real club photos imported from Google Drive (HEIC→WebP, compressed, intrinsic dims); lightbox enlarges on click |
| Public site — Calendar | Verified | Opens on next upcoming ride's month; List/Month/Day views; improved Day view (day-picker + detail) |
| Public site — 404 | Verified | On-brand not-found page (cycling voice + site styling) |
| Brand/theme | Verified | Real logo (transparent), white-dominant amber-forward palette |
| Mobile navigation | Verified | Hamburger menu added (was missing) |
| SEO / share cards | Verified | Meta description, canonical, OG + Twitter cards, og-image.jpg, robots.txt, sitemap.xml, JSON-LD; SWA fallback exclude updated |
| Azure SWA deploy | Verified | Live on tycctoronto.com; auto-deploys on push to main; config sourced from webui/public/ |
| Google Analytics MCP | In progress | `analytics-mcp` installed via pipx; NOT registered — pending GA access + Cloud service-account creds |
| Discord→calendar bot | Proposed | `/ride` slash command recommended; not built; awaiting exec decision |
| Backend / OIDC auth | Deferred | Frontend-only by design |
