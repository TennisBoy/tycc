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
- **Visual checks on Windows**: Playwright MCP's chrome channel won't install; screenshot via
  the npx-cached playwright build. PIL is available for image edits. See
  `knowledge/visual-verification-windows.md`.
- **Deploy**: push to `main` auto-deploys to Azure SWA; `staticwebapp.config.json` lives in
  `webui/public/` (not `dist/`).
