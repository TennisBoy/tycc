# Workspace-Local Custom Skills

## Agent Session Startup

If you are an agent reading this document at session start:

1. Also check third-party skills: read `team-lead/SKILLS-MANAGEMENT.md` and verify required skills are installed via `npx skills list`.
2. Run `find team-lead/skills -name 'SKILL.md' 2>/dev/null || echo 'NO_team-lead_WORKSPACE_SKILLS'` to see which custom skill files exist on disk.
3. Compare the output against the **Custom Skills Registry** table below. Check for a `SKILL.md` file inside each skill directory — a directory without a `SKILL.md` is broken.
4. If a `SKILL.md` exists on disk but its skill is missing from the registry, report it and ask: **"Found an unregistered custom skill: <name>. Add it to the registry? (Y/N)"**
5. If a registry entry has no corresponding `SKILL.md` on disk, report it as broken and ask: **"Registry entry <name> has no SKILL.md on disk. Remove from registry or restore the file? (Remove/Restore)"**
6. Do not modify the registry without human confirmation.
7. Use the **Purpose** column to find the right custom skill for your current task.
8. Invoke by reading `team-lead/skills/<skill-name>/SKILL.md` into context, then following its instructions.

## What Is a Workspace-Local Custom Skill

A workspace-local custom skill is a `SKILL.md` file committed to this repository under `team-lead/skills/<skill-name>/SKILL.md`. It contains specialized instructions tailored to the workflows, conventions, or tooling specific to this workspace.

Custom skills live alongside the code they support, travel with the repo, and are version-controlled.

For global third-party skills installed via `npx skills`, see `team-lead/SKILLS-MANAGEMENT.md`.

## File Structure

Each custom skill is a directory with a single `SKILL.md` file:

```
team-lead/skills/
  <skill-name>/
    SKILL.md    ← skill instructions (read this to invoke the skill)
```

There are no other required files. The `SKILL.md` should open with a clear description of what the skill does and when to use it.

## How Agents Invoke a Custom Skill

See `team-lead/SKILLS-GUIDE.md` for invocation instructions across all agent platforms.

## Custom Skills Registry

This table is the source of truth for which custom skills exist, why they were created, and how they came to be.

| Skill Name | Status | Created Date | Created By | Origin | Purpose | Notes |
|------------|--------|--------------|------------|--------|---------|-------|
| setup-skills | ✅ Active | 2026-04-05 | William Yin | manual | Checks required skills from SKILLS-MANAGEMENT.md and offers to install any missing ones with the correct `-a universal` flag | Invoke with "Setup skills" |
| complete-the-work | ✅ Active | 2026-04-05 | William Yin | ai-assisted | End-of-session ritual: extract memory, write session summary, update playbooks, commit, and push | Invoke with "Complete the work" |
| search-memory | ✅ Active | 2026-04-05 | William Yin | ai-assisted | Grep-based search across memory/, playbooks/, and docs/sessions/ for a topic or keyword | Invoke with "search workspace memory for X" |
| explain-code | 🔧 Draft | 2026-06-06 | William Yin | ai-assisted | Produces a verified explanation of a file/feature/area — data flow, contracts, invariants, guardrail gaps — to move code from vibe-coded to accountable engineering | Invoke with "explain X" or "how does X work" |

**Column definitions:**

- **Status** — `✅ Active` or `🔧 Draft`
- **Created By** — who requested or authored the skill (human name, agent name, or "team")
- **Origin** — how the skill was created: `manual`, `writing-skills` (via the `writing-skills` global skill), or `ai-assisted`
- **Purpose** — the job this skill does; one sentence on *why* it exists and what problem it solves

## Standard Procedures

### Add a New Custom Skill

1. Create the skill file:

   ```text
   team-lead/skills/<skill-name>/SKILL.md
   ```

2. Add a row to the registry table above with all columns filled in.
3. Add a change-log entry in the same work pass.
4. Commit the new file and the updated `SKILLS-CUSTOM.md` together.

### Remove a Custom Skill

1. Delete `team-lead/skills/<skill-name>/` from the repository.
2. Delete the row from the registry table.
3. Add a change-log entry.
4. Commit the deletion and the updated `SKILLS-CUSTOM.md` together.

### Update an Existing Custom Skill

1. Edit `team-lead/skills/<skill-name>/SKILL.md` directly.
2. Update the **Notes** column in the registry if the purpose or behavior changed.
3. Add a change-log entry.

## Registry Update Rules

1. Every custom skill on disk must have a registry entry. No orphaned files.
2. Every registry entry must have a real `SKILL.md` on disk. No phantom entries.
3. All columns must be filled in when adding a row. Empty provenance is not acceptable.
4. Add a change-log entry with every registry modification.
5. Do not list global third-party skills here — those belong in `team-lead/SKILLS-MANAGEMENT.md`.

## Troubleshooting

**`NO_team-lead_WORKSPACE_SKILLS` printed**
The workspace-local skill directory does not exist yet, or no `SKILL.md` files are present. This is normal if no custom skills have been created. Create the directory when needed: `mkdir -p team-lead/skills/`.

**A skill directory exists on disk but is not in the registry**
It was created without a registry entry. Read the `SKILL.md`, infer the provenance as best you can, and ask the human to confirm before adding the row.

**A registry entry has no `SKILL.md` on disk**
The file may have been deleted without updating the registry, or the skill was never written. Ask the human whether to restore or remove the entry.

## Resume Work

If a future session needs to continue custom skill work, start from this file, run the disk-state check, and reconcile before making changes.

Suggested restart prompt:

`Continue workspace custom skills management from team-lead/SKILLS-CUSTOM.md. Run the disk-state check, confirm registry matches disk, then make any requested changes in the same pass.`

## Change Log

Format: `| YYYY-MM-DD | Action | Details |`

| Date       | Change         | Details                                                                             |
|------------|----------------|-------------------------------------------------------------------------------------|
| 2026-04-05 | Initial setup  | Seeded with setup-skills, complete-the-work, and search-memory |
| 2026-06-06 | Add skill      | Added explain-code: verified code explanations (flow, contracts, invariants, guardrail gaps) to drive vibe-coded → agentic engineering |
