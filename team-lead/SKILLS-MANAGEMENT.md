# Skills Management

## Purpose

This document defines the required skills for this workspace. All team members should have these skills installed so everyone works with the same capabilities.

**This file is not auto-loaded at session start.** Invoke it manually when you need to verify or set up your environment.

**Prerequisite:** The `npx skills` CLI must be installed before running any commands in this document. Install it with:

```bash
npm install -g skills
```

When an agent reads this document, it treats the table below as the requirement spec — not a snapshot of what happens to be installed. Missing skills should be installed, not skipped.

## How Agents Use This Document

When invoked:

1. **First-run (fresh device):** Auto-install any skills missing from the table. No confirmation needed on a fresh device.
2. **Ongoing use:** Do not install or remove anything without human confirmation.
3. If the `Repo` column is empty for any skill, run `npx skills find <skill-name>` to locate the repo and update the table before installing.
4. For any skill installed but not in the table, note it as untracked.

## How Skills Are Installed

Skills are installed **project-level** (no `-g` flag) to `.agents/skills/` — the Universal shared directory that all agents read from.

The correct install command is:

```bash
npx skills add [repo] --skill [skillname] -a universal -y
```

The `-a universal` flag targets the shared Universal directory (`.agents/skills/`). Do **not** use `-a '*'` — that installs to every agent-specific directory on the machine.

**`.agents/` is gitignored by design.** Skills are not committed to the repo. The table below is the spec; every team member runs setup to install locally. Use `skills-lock.json` + `npx skills experimental_install` for exact-version reproducibility.

## Required Skills

The following skills are required for this workspace.

**Column notes:**
- `Version` — pin to a specific version (e.g., `1.2.0`) to prevent silent drift across devices. Leave empty to always use latest.
- `Agent Scope` — informational only. `*` means the skill is installed to the shared `.agents/skills/` directory (default for all installs).

| Skill Name      | Repo               | Version | Agent Scope | Category | Status    | Description                                                              |
| --------------- | ------------------ | ------- | ----------- | -------- | --------- | ------------------------------------------------------------------------ |
| brainstorming   | obra/superpowers   |         | *           | Planning | ⌛ Pending | Structured design dialogue that validates ideas before implementation     |
| dispatching-parallel-agents | obra/superpowers |         | *           | Execution | ⌛ Pending | Orchestrates parallel execution of tasks across multiple sub-agents     |
| executing-plans | obra/superpowers   |         | *           | Execution | ⌛ Pending | Systematic workflow for executing complex plans with validation            |
| finishing-a-development-branch | obra/superpowers | | * | Git | ⌛ Pending | Systematic process for cleaning up and merging development branches |
| frontend-design | anthropics/skills  |         | *           | Design   | ⌛ Pending | Create distinctive, production-grade frontend interfaces with high design quality |
| microsoft-docs | github/awesome-copilot | | * | Documentation | ⌛ Pending | Search and read Microsoft documentation for development guidance |
| receiving-code-review | obra/superpowers | | * | Review | ⌛ Pending | Workflow for processing and applying feedback from code reviews |
| requesting-code-review | obra/superpowers | | * | Review | ⌛ Pending | Standardized process for preparing and submitting code for review |
| subagent-driven-development | obra/superpowers | | * | Execution | ⌛ Pending | Strategic use of sub-agents to parallelize and scale development tasks |
| systematic-debugging | obra/superpowers | | * | Debugging | ⌛ Pending | Rigorous, hypothesis-driven approach to identifying and fixing bugs |
| test-driven-development | obra/superpowers | | * | Quality | ⌛ Pending | Workflow for writing tests before code to ensure correctness |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill | | * | Design | ⌛ Pending | Advanced UI/UX design intelligence for modern web and mobile apps |
| using-git-worktrees | obra/superpowers | | * | Git | ⌛ Pending | Manage multiple features concurrently using Git worktrees |
| using-superpowers | obra/superpowers | | * | General | ⌛ Pending | Guidance on effectively using the Superpowers skill suite |
| vercel-react-best-practices | vercel-labs/agent-skills | | * | Best Practices | ⌛ Pending | Specialized guidance for building high-performance React apps on Vercel |
| verification-before-completion | obra/superpowers | | * | Quality | ⌛ Pending | Exhaustive validation checklist to run before completing a task |
| writing-plans | obra/superpowers | | * | Planning | ⌛ Pending | Framework for drafting comprehensive, actionable development plans |
| writing-skills | obra/superpowers | | * | Extension | ⌛ Pending | Instructions for creating new skills to extend agent capabilities |

## Standard Procedures

### Check What Is Installed

```bash
npx skills list 
```

Compare against the Required Skills table. Install anything missing.

### Find a Skill

Before installing, search the ecosystem:

```bash
npx skills find [skillname]
```

If `Repo` is empty in the table, use this to fill it in before adding.

### Add A Skill

When asked to add a skill:

1. If `Repo` is unknown, run `npx skills find <skillname>` first.
2. Install project-level:
   ```bash
   npx skills add [repo] --skill [skillname] -a universal -y
   ```
   For a pinned version:
   ```bash
   npx skills add [repo]@[version] --skill [skillname] -a universal -y
   ```
3. Update the Required Skills table: fill in `Repo`, `Version` (if pinned), set Status to `✅ Active`.
4. Add a change-log entry.

### Remove A Skill

```bash
npx skills remove <skill-name> -y
```

Then remove it from the table in the same work pass.

### Check For Updates

Run:

```bash
npx skills check
```

### Update Installed Skills

Run:

```bash
npx skills update
```

Then reconcile the inventory immediately.

### Restore From Lock File

If a `skills-lock.json` exists in the repo root, restore exact versions with:

```bash
npx skills experimental_install
```

This is the most reliable way to guarantee all team members are on identical versions. Commit `skills-lock.json` to the repo after running `npx skills add` to lock state.

## Table Update Rules

1. After every add or remove, update the Required Skills table in the same work pass.
2. Always populate `Repo` when adding a skill. If unknown, run `npx skills find <skill-name>` first.
3. Populate `Version` if you want to pin the skill. Leave empty to track latest.
4. Add a change-log entry. Format: `| YYYY-MM-DD | Added/Removed/Updated <skill-name> | Brief reason or source |`
5. Do not leave the file partially updated.
6. Do not list workspace-local custom skills here — those belong in `team-lead/SKILLS-CUSTOM.md`.

## Troubleshooting

**`npx skills list` fails or returns unexpected output**
Re-run with `npx skills list 2>&1` to see error details.

**`npx skills list` shows missing required skills**
Install each missing skill using `npx skills add [repo] --skill [skillname] -a universal -y` (see the Required Skills table for repo and skill name), then confirm with the human before proceeding.

**A skill listed as Active does not work as expected**
Run `npx skills check` to verify skill integrity. If the skill is out of date, run `npx skills update`.

## Change Log

Format: `| YYYY-MM-DD | Action | Details |`

|------------|-----------------|-------------------------------------------------------------------------|
