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
