# team-lead

This directory is the mandatory operating harness for this project. It contains the control-plane docs, workflow, status tracking, memory, playbooks, templates, scripts, and skills needed to work effectively with AI agents.

## Directory Layout

| Directory / File | Purpose |
|------------------|---------|
| `memory/` | The single durable store for reusable patterns, environment gotchas, and promoted session learnings |
| `status/` | Required capability tracking artifacts |
| `playbooks/` | Repeatable step-by-step procedures |
| `templates/` | Shared scaffolds (session summary, etc.) |
| `scripts/` | Helper scripts including the placement enforcement hook installer |
| `skills/` | Workspace-local custom skills (each skill has a `SKILL.md`) |
| `SKILLS-MANAGEMENT.md` | Registry of required third-party agent skills (e.g., writing-plans) |
| `SKILLS-CUSTOM.md` | Registry of workspace-local custom skills |
| `SKILLS-GUIDE.md` | Instructions for agents on how to invoke skills |
| `docs/WORKFLOW.md` | Mandatory execution loop for meaningful work |
| `docs/plans/active/` | Executable plans currently in progress |
| `docs/plans/completed/` | Verified completed plans |
| `docs/sessions/` | Per-session summaries written by `complete-the-work` |

## Getting Started

1. Install the pre-commit placement enforcement hook: `bash team-lead/scripts/install-hooks.sh`
2. **Setup Agent Skills:** Ask an agent to "Setup skills" or read `SKILLS-MANAGEMENT.md`. This installs the required Superpowers (like `writing-plans`).
3. Read `README.md`, `ARCHITECTURE.md`, `MEMORY.md`, `WORKING-AGREEMENTS.md`, and `docs/WORKFLOW.md` before substantial work.
4. Check `status/CAPABILITY-STATUS.md` before starting work that changes project capabilities.
5. Run `complete-the-work` at the end of each session to capture durable memory.
