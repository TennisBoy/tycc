---
name: search-memory
description: Use when the user wants to search workspace notes, playbooks, or session summaries for a topic or keyword.
argument-hint: The search query (phrase or keyword to look for).
---

# Search memory

## When to Use

- The user says `search workspace memory for X`, `find notes about X`, `search memory for X`, or similar.

## Search Scope

- `team-lead/knowledge/*.md` — persistent and generalizable patterns, gotchas, and reusable notes
- `team-lead/memory/*.md` — contextual and time-bound state (current focus, decisions, blockers)
- `team-lead/playbooks/*.md` — executable workflows
- `team-lead/docs/sessions/*.md` — per-session summaries

## Procedure

1. Extract the query from the user's message. Treat the full input as a literal string — do not split into words or interpret as a regex.
2. Run the search:

```bash
grep -r -i -n -F -C 2 "QUERY" \
  team-lead/knowledge/ \
  team-lead/memory/ \
  team-lead/playbooks/ \
  team-lead/docs/sessions/ \
  --include="*.md" 2>/dev/null
```

Replace `QUERY` with the user's literal search string, properly quoted.

3. Format the output grouped by file:

```
team-lead/knowledge/vendor-notes.md
  Line 14: "AWS proposal includes dedicated support tier"

team-lead/playbooks/complete-the-work.md
  Line 7: "Save persistent patterns in team-lead/knowledge/."
```

4. If no results are found, respond:

> No notes found for 'QUERY'. Consider adding one with complete-the-work.

## Notes

- Do not use ripgrep (`rg`) — use `grep` for portability across environments without ripgrep installed.
- The `-n` flag is required so output includes line numbers.
