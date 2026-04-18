# Workspace Architecture

## Purpose

This document defines how the operating harness is organized for this repository.

## Core Model

1. `AGENTS.md` is the root entry point.
2. `team-lead/` is the mandatory operating harness.
3. `team-lead/WORKFLOW.md` defines the required execution loop.
4. `team-lead/docs/specs/` stores approved design specs.
5. `team-lead/docs/plans/active/` stores executable plans in progress.
6. `team-lead/docs/plans/completed/` stores verified completed plans.
7. `team-lead/status/` stores required capability tracking artifacts.
8. `team-lead/knowledge/` stores persistent and generalizable patterns, environment gotchas, and promoted session learnings.
9. `team-lead/memory/` stores contextual and time-bound state (current focus, active decisions, session context).
10. `team-lead/playbooks/` stores executable workflows.
11. `team-lead/templates/` stores shared scaffolds.
12. `team-lead/scripts/` stores helper and verification scripts.

## Storage Model

| Tier | Directory | Content type | Expires? |
|---|---|---|---|
| Memory | `team-lead/memory/` | Current focus, active decisions, session context | Yes |
| Knowledge | `team-lead/knowledge/` | Persistent patterns, gotchas, architectural facts | No |
| Playbook | `team-lead/playbooks/` | Executable step-by-step workflows | No |
