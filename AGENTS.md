# tycc - Claude Code Extensions

Scaffolded by ystack on 2026-04-18. Type: fullstack.

## Project Context

A website for Toronto Youth Cycling Club.

## Skill Routing

When the user's request matches an available skill, read the corresponding SKILL.md and follow its instructions.

| Trigger | Skill file |
|---------|-----------|
| "Complete the work", "complete the work", "wrap up the session", "end of session" | `team-lead/skills/complete-the-work/SKILL.md` |
| "Search workspace memory for X", "find notes about X", "search memory for X" | `team-lead/skills/search-memory/SKILL.md` |
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

## Session Workflow

At the end of each session, run `complete-the-work` to extract memory, write a session summary, update the baton pass, and commit.