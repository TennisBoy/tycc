# Session: SEO refine + explain-code skill + GA MCP wiring
Date: 2026-06-11
Worked on: webui SEO, team-lead skills, Google Analytics MCP setup

## Context

Three goals for the session: (1) refine SEO, (2) add the Google Analytics MCP (parked last
session pending GA access/creds), (3) create an "explain code" skill to push the project from
vibe-coded toward agentic engineering. Order chosen: SEO → skill → GA.

## What I did

- **SEO (done, verified):** Found every route was serving the homepage's `index.html` title/
  description/canonical. Built `webui/src/shared/seo/useSeo.ts` (a hook that mutates the existing
  head tags in place on each navigation) + `routeMeta.ts` (per-path title/description, home
  fallback, copy drawn from real `content.ts`). Wired once in `PublicLayout` via `useLocation`.
  Added `noindex` to the 404. Trimmed the home description 171→157 chars in both `index.html` and
  `routeMeta.ts`. 6 new tests in `seo.test.tsx`. Type-check + lint + 27 tests + build all green.
- **explain-code skill (done):** New workspace skill `team-lead/skills/explain-code/SKILL.md` that
  produces *verified* code explanations — what it is, traced flow, contracts & invariants,
  guardrails & gaps, gotchas, and verify commands — with an option to bank durable findings into
  `knowledge/`. Registered in `team-lead/SKILLS-CUSTOM.md` (registry + changelog) and the
  `AGENTS.md` routing table. Dogfooded it on the new SEO module.
- **GA MCP (one step from done):** Installed gcloud (winget). User logged in
  (`william.xhyin@gmail.com`, Administrator on GA account 396328696). Created project
  `tycc-ga-mcp`, enabled Analytics Data + Admin APIs, created service account
  `ga-mcp@tycc-ga-mcp.iam.gserviceaccount.com` + key at `C:\Users\yinxi\keys\ga-mcp-key.json`
  (off-repo), registered the MCP `google-analytics` (local scope). Verified the key against the
  Admin API (authenticates; no GA access yet). The only remaining step — adding the SA as a GA
  Viewer — was blocked by the GA UI rejecting the SA email ("doesn't match a Google Account").

## Key decisions

- **GA auth = service account, not user login.** User ADC login is blocked by Google for the
  Analytics sensitive scope; service accounts skip that consent wall. User chose to stick with the
  robot method to learn it. Plan B (own OAuth client + user login) held in reserve.
- **Per-route SEO mutates existing head tags** rather than rendering JSX tags (React 19 hoisting
  would duplicate the static `index.html` tags). MCP registered at local scope (key path is
  machine-specific; never committed).
- **Committed on branch `codex/add-contact-phone-number`, not merged to `main`** → committed but
  not deployed. The deploy (merge to main, which also ships the contact-phone commit) is left as a
  deliberate supervised step.

## What was learned and saved

- `knowledge/google-analytics-mcp-setup.md` — full service-account setup procedure + the two big
  gotchas (sensitive-scope block on user ADC; brand-new SA rejected by GA's add-user form), plus a
  Python snippet to verify the key against the Admin API without loading the MCP in-session.
- `knowledge/seo-per-route-meta.md` — the in-place head-tag mutation pattern and the React 19
  hoisting-duplication gotcha.

## Next session priorities

1. Add the SA as a GA Viewer (Incognito, single account, type the email) → restart Claude / `/mcp`
   → verify a live metric. Fall back to Plan B if the form keeps failing.
2. Deploy: merge `codex/add-contact-phone-number` → `main` (supervised).
3. Reconcile exec titles, add William's photo/bio, confirm apex vs www canonical.
