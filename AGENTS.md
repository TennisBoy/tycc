# tycc - Claude Code Extensions

Scaffolded by ystack on 2026-04-18. Type: fullstack.

## Project Context

A website for Toronto Youth Cycling Club.

## Development (webui)

Frontend-only React 19 + Vite SPA. All app code lives in `webui/`; there is **no backend in this repo**.

```bash
cd webui
npm install
npm start        # Vite dev server on http://localhost:8001 (NOT 3000)
npm test         # vitest run (jsdom; setup in src/test/setup.ts)
npm run lint     # eslint (enforces import boundaries via eslint-plugin-boundaries)
npm run type-check
npm run build    # vite build → webui/dist
```

Stack: TanStack Query, react-router v7, Tailwind v4 + shadcn/ui (Radix), OIDC auth
(`react-oidc-context`), zod, react-hook-form. Path alias `@` → `webui/src`.

### App Architecture
- Pages are feature-based: `src/features/<feature>/pages/*.tsx`.
- The route table is the single source of truth: `src/routes/index.ts` (currently Home,
  About, Calendar, Routes under `PublicLayout`). Add a page by registering it there.
- Entry: `src/index.tsx` → `AppRouter.tsx` → `App.tsx`. Providers in `src/app/AppProviders.tsx`.

### Deployment
Auto-deploys to **Azure Static Web Apps** on push to `main`
(`.github/workflows/azure-static-web-apps-*.yml`): `app_location: ./webui`, output `dist`,
no API. SPA navigation fallback is handled by `staticwebapp.config.json`.

## Skill Routing

When the user's request matches an available skill, read the corresponding SKILL.md and follow its instructions.

| Trigger | Skill file |
|---------|-----------|
| "Complete the work", "complete the work", "wrap up the session", "end of session" | `team-lead/skills/complete-the-work/SKILL.md` |
| "Search workspace memory for X", "find notes about X", "search memory for X" | `team-lead/skills/search-memory/SKILL.md` |
| "Explain X", "how does X work", "walk me through X", "what does X do", "document X" | `team-lead/skills/explain-code/SKILL.md` |
| "Setup skills", "setup skills", "install skills", "check skills", "verify skills" | `team-lead/skills/setup-skills/SKILL.md` |

## Placement Rules

All workspace artifacts belong under `team-lead/`. See `team-lead/WORKING-AGREEMENTS.md` for the full layout.
The pre-commit hook (`team-lead/scripts/install-hooks.sh`) enforces this at commit time.
CI enforces it on pull requests (`.github/workflows/check-placement.yml`).

Both gates run on the same allowlist. If you add a new sanctioned path under `team-lead/`, update BOTH `.github/workflows/check-placement.yml` and `team-lead/scripts/install-hooks.sh`.

## Type-Specific Conventions (fullstack)

- Treat `team-lead/` as the mandatory operating harness. Persistent patterns go in `team-lead/knowledge/`, current session state goes in `team-lead/memory/`, repeatable procedures go in `team-lead/playbooks/`, and quick-recall pointers belong in `team-lead/MEMORY.md`. (ystack learning: `knowledge-memory-playbook-distinction`)
- Keep CI and pre-commit placement enforcement in sync. Adding a new sanctioned location to only one allowlist will block local commits or create CI drift. (ystack learning: `dual-allowlist-sync`)
- End every meaningful session with `complete-the-work` so baton-pass context, session summaries, and durable learnings keep compounding across agent sessions. (ystack learning: `harness-compounding-loop`)
- Preserve the generated `webui/` scaffold wiring unless you are intentionally changing the architecture: TanStack Query lives in `src/app/AppProviders.tsx`, tests should create a fresh `QueryClient` per run, and cross-feature sharing should flow through `src/shared/`.
- When customizing the copied frontend scaffold, watch the known pitfalls: `src/api/clients/baseClient.ts` should clear OIDC data from `sessionStorage`, and the copied data-table utilities depend on `src/types/common.ts`.
- The root `Makefile` is stale scaffold: its `build`/`test`/`run`/`clean`/`codegen` targets `cd webapi` (a .NET backend) that does **not** exist in this repo, and `codegen` points at a non-running `localhost:5000`. Use the `webui` npm scripts above; ignore or fix the Makefile before relying on it.

## Session Workflow

At the end of each session, run `complete-the-work` to extract memory, write a session summary, update the baton pass, and commit.