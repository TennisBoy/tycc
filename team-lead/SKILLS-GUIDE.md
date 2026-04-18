# How Agents Invoke Skills

This guide covers how to invoke skills across all supported agent platforms. It applies to both global third-party skills (tracked in `team-lead/SKILLS-MANAGEMENT.md`) and workspace-local custom skills (tracked in `team-lead/SKILLS-CUSTOM.md`).

## GitHub Copilot

Type `/skill-name` in the chat prompt. Examples:

- `/executing-plans`
- `/systematic-debugging`
- `/writing-plans`

Copilot will locate and load the skill automatically.

## Claude Code

Type `/skill-name` in the chat prompt. Claude Code resolves skills via its own built-in skill loader — it does not use the `npx skills` CLI. Workspace-local custom skills are loaded from `team-lead/skills/<skill-name>/SKILL.md`.

Alternatively, Claude Code and Codex can be routed via the `AGENTS.md` trigger table, which reads the `SKILL.md` file directly into context. See `AGENTS.md` → `## Skill Routing` for trigger phrases.

## Other Agents (VS Code extensions, CLI agents, custom agents)

**For third-party skills:**

1. Find the skill in `team-lead/SKILLS-MANAGEMENT.md` (use the Category and Repo columns).
2. Skills are installed project-level in this repo's agent directories. Look for `SKILL.md` in:
   - `.agents/skills/<skill-name>/SKILL.md` (all-agent skills)
   - `.<agent>/skills/<skill-name>/SKILL.md` (agent-specific, e.g. `.claude/skills/<skill-name>/SKILL.md`)
   - Or run `npx skills list` to see what is installed and where.
3. Read the `SKILL.md` content into your context.
4. Follow the skill's instructions.

**For workspace-local custom skills:**

1. Find the skill in `team-lead/SKILLS-CUSTOM.md` (use the Purpose column).
2. Read `team-lead/skills/<skill-name>/SKILL.md` into your context.
3. Follow the skill's instructions.

If your agent platform has its own skill-loading mechanism, defer to that. The inventory documents are the source of truth for which skills exist — not for how each platform loads them.
