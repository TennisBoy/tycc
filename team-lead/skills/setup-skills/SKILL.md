---
name: setup-skills
description: Use when checking whether the workspace's required skills are installed, setting up skills on a fresh device, or adding a new skill to the shared workspace requirements.
argument-hint: Check required skills, or add a named skill to the workspace requirements.
---

# Setup Skills

## Overview

Use this skill to reconcile the workspace's required skill inventory with what is installed locally.

There are two supported workflows:
- Verify and optionally install the required skills from `team-lead/SKILLS-MANAGEMENT.md`
- Find, install, and register a new skill in the workspace requirements

## When to Use

- The user says `setup skills`, `check skills`, `install skills`, or `verify skills`
- The user asks to `install skill <name>`, `add skill <name>`, or add a skill to the workspace
- You need to compare the machine's installed skills against the workspace requirement spec

Do not use this skill for editing unrelated skill content. Use a skill-authoring workflow for that.

## Workspace Rules

- Treat `team-lead/SKILLS-MANAGEMENT.md` as the source of truth for required third-party skills
- Install third-party skills project-level with `npx skills add <repo> --skill <name> -a universal -y`
- Treat `.agents/skills/` as local machine state, not committed repo content
- Do not add workspace-local custom skills from `team-lead/skills/` to the required third-party table

## Procedure

### Mode A: Verify Required Skills

Use this mode for `setup skills`, `check skills`, `install skills`, or `verify skills`.

1. Read `team-lead/SKILLS-MANAGEMENT.md` and extract every row from the `Required Skills` table.
2. Inspect local skill state with:

```bash
npx skills list 2>&1
ls .agents/skills/ 2>/dev/null || echo "NO_AGENTS_DIR"
npx skills list -g 2>&1
```

3. Compare the installed project-level skills to the table.
4. Report one of these outcomes:
- All required skills are installed
- Some required skills are missing
- The local install state is unclear because a command failed
5. If all required skills are present, stop after reporting success.
6. If skills are missing and this looks like a fresh device or fresh clone setup, install the missing skills without asking first.
7. Otherwise, ask the user whether to install the missing skills now.
8. Install each missing skill with one of:

```bash
npx skills add <repo> --skill <name> -a universal -y
```

```bash
npx skills add <repo>@<version> --skill <name> -a universal -y
```

9. Verify with `npx skills list` and report success or failure per missing skill.

### Mode B: Add a New Skill by Name

Use this mode for `install skill <name>`, `add skill <name>`, or equivalent wording.

1. Extract the skill name from the user's message.
2. Find candidate packages with:

```bash
npx skills find <skill-name> 2>&1
```

3. If no result is found, tell the user the skill could not be found and ask for the exact name or repo.
4. If a result is found, report the repo, matching skill name, and short description.
5. Ask the user whether to:
- Install the skill locally
- Install it and add it to `team-lead/SKILLS-MANAGEMENT.md`
- Cancel
6. If the user chooses install, run:

```bash
npx skills add <repo> --skill <skill-name> -a universal -y
```

7. Verify the install with `npx skills list`.
8. If the user also wants the workspace requirement updated, edit `team-lead/SKILLS-MANAGEMENT.md` in the same work pass:
- Add a row to the `Required Skills` table
- Fill `Repo` from the search result
- Leave `Version` empty unless the user requested a pin
- Set `Agent Scope` to `*`
- Infer `Category`
- Set `Status` to `✅ Active`
- Use a one-line description from the registry result
9. Add a matching `Change Log` row using the current date.
10. Report what was installed and what documentation was updated.

## Reporting Format

When reporting status, include:
- How many required skills the workspace expects
- Which required skills are missing, if any
- Whether global skills were checked and why they do not satisfy the project requirement
- The exact install command you plan to run before you run it

When updating `team-lead/SKILLS-MANAGEMENT.md`, also report:
- The new required-skill row that was added
- The change-log entry that was added

## Common Mistakes

- Treating `npx skills list -g` as satisfying the repo requirement. It does not.
- Updating the required-skills table without installing the skill, or installing without updating the table when the user asked for both.
- Adding workspace-local custom skills from `team-lead/skills/` to the third-party requirements table.
- Leaving `Repo` empty after adding a new required skill.

## Reference

- Requirement spec: `team-lead/SKILLS-MANAGEMENT.md`
