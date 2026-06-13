# Session: GA MCP go-live + portable journal kit
Date: 2026-06-12
Worked on: Google Analytics MCP auth, team-lead knowledge/memory, a new standalone journaling kit

## Context

The Google Analytics MCP had been parked for several sessions, stuck on one step: granting the
service-account ("robot") access inside the Google Analytics UI. The add-user form kept rejecting
the SA email. This session's job was to get it actually working — and then to capture the lesson
durably so it never costs that much time again.

## What I did

- **Got the GA MCP working end-to-end.** Abandoned the service-account route (the GA add-user form
  never accepted the SA email) and switched to **ADC user-login as the human admin**
  (`william.xhyin@gmail.com`, already a GA Administrator — so no grant step to get stuck on):
  - User created their **own** OAuth client (Desktop app) — the *shared* gcloud client is blocked
    for the Analytics sensitive scope.
  - Added themselves as a **test user** on the consent screen (fixed `Error 403: access_denied`).
  - ⭐ Registered the `analytics.readonly` scope under the consent screen's **Data Access** — the
    final unlock (the scope must be both *requested* in the CLI and *declared* on the consent screen).
  - Ran `gcloud auth application-default login --scopes="…analytics.readonly,…cloud-platform"
    --client-id-file=…` (quoting the scopes — PowerShell otherwise splits on the comma and drops one).
  - Repointed the MCP: removed `GOOGLE_APPLICATION_CREDENTIALS` from `~/.claude.json` (set `env: {}`)
    so the auth library auto-discovers the ADC file instead of the stale SA key.
  - **Verified live:** `get_account_summaries` returns TYCC account **396328696** / property
    **539644755** ("TYCC Toronto Website").
  - Cleaned up: user deleted the SA key file; SA itself can be removed in the Console.
- **Rewrote `knowledge/google-analytics-mcp-setup.md`** to lead with the working user-login method;
  the robot route is now a labelled "post-mortem / don't retry" section. Updated `MEMORY.md` and
  `status/CAPABILITY-STATUS.md` (GA → Verified/LIVE).
- **Created `project-journal-kit`** — a standalone sibling repo (first commit `a6f6f74`): a
  portable, dependency-free 5-file journaling template (BATON/STATE/KNOWLEDGE/decisions/RITUAL +
  README) that distills the good parts of `team-lead/` for reuse on any future project, with no
  generator, scripts, or external links.
- **Clarified the ystack relationship:** verified tycc has **no live code connection** to the
  ystack generator — only a path string in `PROVENANCE.md` and three opt-in sync scripts. No
  submodule/symlink/remote/dependency.

## Key decisions

- **GA auth = ADC user-login, reversing the 2026-06-11 service-account decision.** When a human
  with the needed access is in the loop, prefer logging in as them — a service account only adds a
  grant step that can get stuck. (Service accounts remain correct for *unattended/server* use.)
- **Ship the journal kit as a plain copy-able folder, not a generator.** Deliberately avoids the
  moving parts (sync scripts, dangling parent pointers) that the ystack discussion exposed.
- **Left the leaked Desktop-app OAuth client secret in place.** Low sensitivity (unusable without
  the consent screen + test-user list); rotation steps documented for later if wanted.

## What was learned and saved

- `knowledge/google-analytics-mcp-setup.md` (rewritten) — the working user-login procedure + five
  gotchas (shared-client sensitive-scope block; PowerShell comma-splitting `--scopes`; `403` =
  missing test user; scope must be registered under Data Access not just requested; empty result =
  restart MCP / unset `GOOGLE_APPLICATION_CREDENTIALS`) + the robot-route post-mortem.
- `project-journal-kit/` — reusable journaling template embodying: split durable vs time-bound,
  log dead ends with WHY, baton-pass for instant resume, one end-of-session ritual.
- `knowledge/verifying-a-deploy.md` — plain-language guide to confirming a deploy end-to-end:
  `gh` CLI for the GitHub Actions side, `curl`+`grep` against the live site, the content-hash
  fingerprint linking them, the browser-render limitation, and the CI placement bug + fix.

## Continued (same session): deploy, verify, CI fix, auto-commit

- **Deployed:** merged branch → `main` (fast-forward `afe8dc5`, green gate), pushed; Azure SWA
  auto-deployed. Also pulled the **first GA report** (63 users / 703 views / 121 sessions, 30d).
- **Verified the deploy end-to-end** (user's first project, so we did it properly): `gh run list`
  confirmed Azure CI/CD success; `curl`+`grep` of the live JS bundle confirmed all five per-route
  SEO descriptions are served. (A first grep false-alarmed by searching runtime-built *titles*;
  searching the literal *descriptions* confirmed it — verification catches your own mistakes too.)
- **Fixed a CI bug found while verifying:** the "Check team-lead Placement" job kept going red
  because `.github/workflows/check-placement.yml` lacked `team-lead/status/` (the pre-commit hook
  had it) — a two-allowlist drift. Added it; proven via local repro.
- **Auto-commit:** user asked to auto-commit everything. Set up "Both" (proactive descriptive
  commits + a local-only, skip-`main` Stop hook), tested both behaviors, then **removed the hook**
  at the user's request. Standing behavior kept: I commit as I work with good messages, never
  auto-push (since `main` auto-deploys). `.claude/settings.local.json` gitignored.

## Next session priorities

- **Pull GA breakdowns** (top pages, sources, devices) from property `539644755` once the launch
  post drives traffic.
- Reconcile exec titles; add William's photo/bio; confirm apex vs www canonical.
- (Optional) delete the now-unused service account in the Cloud Console.
