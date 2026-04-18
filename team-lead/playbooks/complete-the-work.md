# Complete the Work

## Purpose

Use this workflow when the user says `Complete the work`.

## Storage Rules

- Save capability-state changes in `team-lead/status/CAPABILITY-STATUS.md`.
- Save persistent and generalizable patterns, environment gotchas, and future-facing lessons in `team-lead/knowledge/`.
- Save contextual and time-bound state (current focus, active decisions, blockers) in `team-lead/memory/`.
- Save concise per-session summaries in `team-lead/docs/sessions/`.
- Save or update `team-lead/playbooks/` when the session produced a repeatable step-by-step procedure.
- Use `team-lead/templates/session-summary.md` as the scaffold for session summaries.

## Workflow

1. Review the current session and identify the requests, decisions, responses, reusable knowledge, contextual state, and follow-up items worth keeping.
2. Distill persistent and generalizable patterns, environment gotchas, and future-facing lessons into one or more Markdown notes under `team-lead/knowledge/` using lowercase kebab-case filenames.
3. Update `team-lead/memory/session-context.md` with a summary of the session's key outcomes and open items.
4. Update `team-lead/memory/recent-decisions.md` when significant decisions were made this session.
5. Update `team-lead/memory/current-focus.md` when the project focus has shifted.
6. Update `team-lead/memory/active-blockers.md` when new blockers arose or existing ones were resolved.
7. Update `team-lead/status/CAPABILITY-STATUS.md` when capability state changed during the session.
8. Update `team-lead/MEMORY.md` when a new workspace tool, path, or setup pattern became durable.
9. Run `bash team-lead/scripts/check-harness-memory-gap.sh`. If it returns `GAP_DETECTED`:
   - STOP and ask the user: "I see we've updated the harness tools (scripts/skills/templates) but didn't update the corresponding documentation. What's the key pattern or 'aha!' moment we should record for these tool changes? (Type 'skip' to proceed without recording)"
   - If the user provides a response, distill it into a new note in `team-lead/knowledge/` or append to an existing one.
   - If the user says "skip", proceed to the next step.
10. Update the Structured Baton Pass in team-lead/memory/baton-pass.md:
    - Pre-fill "Pending Files" based on git status.
    - Pre-fill "Active Plan" based on files in team-lead/docs/plans/active/.
    - Ask the user: "What's the exact Next Goal for the next session to maintain momentum?"
    - Record the "Last Verified" command or check if applicable.
    - Overwrite team-lead/memory/baton-pass.md with the structured table.
11. Write a concise session summary using `team-lead/templates/session-summary.md` as the scaffold. Review the current session and distill the key requests, outcomes, and decisions. Fill in the template using what you know from this session's conversation context — do not run git commands to infer session content, since this workflow runs before the commit. Save to `team-lead/docs/sessions/YYYY-MM-DD-session-summary.md`. If that file already exists, append a `-2` suffix (e.g., `2026-04-05-session-summary-2.md`).
12. Add or update a playbook when the session produced a reusable workflow.
13. Stage the saved Markdown files and create a Conventional Commit that describes the captured knowledge or workflow update.
14. Push to the default remote when available.
15. Return a short recap that lists what was saved, the commit message, and whether push succeeded.
16. Check for unsynced universal learnings by running `bash team-lead/scripts/check-sync-status.sh`. If the output is greater than 0, include this hint in the final recap:
    `[INTEL] {N} new universal learnings ready for promotion. Run 'bash team-lead/scripts/harness-sync.sh' to update the core ystack.`
17. Check for harness drift. Compare local `Harness Package Version` in `team-lead/PROVENANCE.md` against parent `team-lead/VERSION`. If they differ, or periodically, run:
    `[HARNESS] Improvements available. Run 'bash team-lead/scripts/check-harness-drift.sh' to inspect.`

## Summary Guidance

- Focus on reusable and meaningful content, not raw transcript dumps.
- Capture what the user asked, what response or change was provided, and why it matters later.
- Link related notes when a session summary references durable knowledge or a playbook.

## Safety Notes

- Do not save secrets, tokens, unsanitized mail bodies, or tenant-specific details unless already scrubbed.
- Prefer distilled notes over verbatim chat history.
- If push fails because the remote or credentials are unavailable, keep the local files and local commit, then report the failure clearly.
