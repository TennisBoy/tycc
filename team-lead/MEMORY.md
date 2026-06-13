# Workspace Memory

Agent-optimized quick-recall facts for this workspace. Each entry is a condensed reference to a full pattern doc in `team-lead/`. Read the linked doc for full details.

## Storage Model

| Write here | When content is... |
|---|---|
| `team-lead/knowledge/` | Persistent and generalizable (patterns, gotchas, architectural facts) |
| `team-lead/memory/` | Contextual and time-bound (current focus, active decisions, session state) |
| `team-lead/playbooks/` | An executable step-by-step workflow |

## Patterns

- **Workflow**: use `team-lead/WORKFLOW.md` for the required execution loop
- **Status**: track capability state in `team-lead/status/CAPABILITY-STATUS.md`
- **Knowledge store**: use `team-lead/knowledge/` for persistent patterns, environment gotchas, and promoted session learnings
- **Memory store**: use `team-lead/memory/` for time-bound contextual state (current focus, decisions, blockers)
- **Plans**: active plans live in `team-lead/docs/plans/active/`; verified plans move to `team-lead/docs/plans/completed/`

## Project Facts (TYCC site)

- **Site content** = single source of truth in `webui/src/shared/tycc/content.ts`; copy comes
  from the club's real material in `/raw` (git-ignored inbox). See `knowledge/tycc-site-patterns.md`.
- **Dev server**: `cd webui && npm start` → http://localhost:8001 (NOT 3000).
- **Real assets**: logo + exec photos in `webui/public/`; stock hero/gallery images are
  placeholders to be replaced.
- **Visual checks on Windows**: Playwright MCP's chrome channel won't install. Preferred:
  `playwright-core` in a temp dir under git-ignored `raw/`, `executablePath` → the `ms-playwright`
  bundled Chromium. See `knowledge/visual-verification-windows.md`.
- **Deploy**: push to `main` auto-deploys to Azure SWA; `staticwebapp.config.json` lives in
  `webui/public/` (not `dist/`); its `navigationFallback.exclude` must list static asset
  extensions (incl. txt/xml/webp) so crawlers get real files.
- **Gallery**: real club photos imported from the Google **Drive "WEBSITE MEDIA"** folder;
  pipeline (HEIC→WebP, BRouter route distances, SEO/og-image, GA MCP) in
  `knowledge/media-and-route-pipelines.md`.
- **Google Analytics MCP**: **LIVE 2026-06-12** — authenticates as the user
  (`william.xhyin@gmail.com`, already a GA Administrator) via ADC user-login, NOT a service
  account. MCP `google-analytics` in `~/.claude.json` with `env: {}` (no
  `GOOGLE_APPLICATION_CREDENTIALS` → auto-uses the ADC file from `gcloud auth
  application-default login --client-id-file=...`). The robot/service-account route was abandoned
  (GA "add user" form kept rejecting the SA); SA + key deleted. Final unlock was registering the
  `analytics.readonly` scope under the consent screen's **Data Access**. Procedure + gotchas:
  `knowledge/google-analytics-mcp-setup.md`. GA account id **396328696**, property **539644755**,
  measurement id `G-QFH9YQQJJH`.
- **SEO**: per-route `<head>` tags via `useSeo` hook (`webui/src/shared/seo/`), wired in
  `PublicLayout`. Mutate existing tags in place — do NOT use React 19 hoisting (duplicates the
  static `index.html` tags). See `knowledge/seo-per-route-meta.md`.
- **gcloud** on this machine: `C:\Users\yinxi\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\`
  (on persistent user PATH; a fresh terminal sees it, an already-open shell does not).
- **Custom workspace skills**: `explain-code` ("explain X" → verified code explanation) joins
  setup-skills / complete-the-work / search-memory. Registry: `team-lead/SKILLS-CUSTOM.md`.
- **File-loss gotcha**: files sometimes vanish from the repo (OneDrive/AV) — restore via
  `git checkout <ref> -- <path>`.
- **Verifying a deploy**: `gh run list --branch main` for the Azure CI/CD status; `curl` the live
  page + JS bundle and `grep` for known strings to confirm the new code is served (SPA: SEO tags
  are JS-built, so grep *descriptions* not runtime-built *titles*). Browser-render check needs
  Playwright (Chromium not installed here). Full how-to: `knowledge/verifying-a-deploy.md`.
- **Commit/deploy convention**: pushing `main` auto-deploys to production, so **never auto-push**.
  Work on a branch, commit proactively with descriptive messages, then merge→`main` + push as a
  deliberate, gate-green step. (An auto-commit Stop hook was tried and removed — too noisy.)
- **CI placement allowlist** lives in TWO files that must stay in sync: `.github/workflows/
  check-placement.yml` and `team-lead/scripts/install-hooks.sh`. `team-lead/status/` is sanctioned;
  both lists must include every sanctioned subdir or CI/local gates disagree (ystack: `dual-allowlist-sync`).
