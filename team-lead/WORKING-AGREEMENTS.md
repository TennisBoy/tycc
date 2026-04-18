# Working Agreements

This repository uses a mandatory `team-lead/` operating harness. Do not replace it with a parallel local process system.

## Placement Rules

All workspace artifacts belong under `team-lead/`:

| Artifact type | Where it goes |
|--------------|---------------|
| Workflow | `team-lead/WORKFLOW.md` |
| Active plans | `team-lead/docs/plans/active/` |
| Completed plans | `team-lead/docs/plans/completed/` |
| Plan-side specs | `team-lead/docs/plans/specs/` |
| Capability status | `team-lead/status/CAPABILITY-STATUS.md` |
| Persistent patterns, gotchas, and reusable notes | `team-lead/knowledge/*.md` |
| Contextual and time-bound state | `team-lead/memory/*.md` |
| Session summaries | `team-lead/docs/sessions/YYYY-MM-DD-session-summary.md` |
| Repeatable workflows | `team-lead/playbooks/*.md` |
| Shared templates | `team-lead/templates/*.md` |
| Custom skills | `team-lead/skills/<skill-name>/SKILL.md` |
| Helper scripts | `team-lead/scripts/*.sh` |

The pre-commit hook at `team-lead/scripts/install-hooks.sh` enforces these rules.

## Workflow Rules

- Use `team-lead/WORKFLOW.md` as the default execution loop.
- Keep executable plans in `team-lead/docs/plans/active/` until the work is verified.
- Move verified plans to `team-lead/docs/plans/completed/`.
- Update `team-lead/status/CAPABILITY-STATUS.md` when capability state changes.
- Update `team-lead/MEMORY.md` when a workspace tool, path, or setup pattern becomes durable.

## PR Workflow

- Run the harness verification scripts before opening a PR.
- Keep scaffold and canonical harness files aligned; do not silently diverge invariant artifacts.

## Code Standards

- Prefer small, reviewable changes.
- Keep documentation and scaffold behavior consistent.
