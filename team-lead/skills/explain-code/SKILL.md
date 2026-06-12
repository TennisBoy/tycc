---
name: explain-code
description: Use when the user wants to understand how a file, feature, or area of the codebase works — "explain X", "how does X work", "walk me through X", "what does X do", or before changing unfamiliar code. Produces a verified explanation (data flow, contracts, invariants, guardrail gaps) that turns vibe-coded code into accountable, documented engineering.
argument-hint: The file path, feature name, or area to explain (e.g. "src/shared/seo" or "the calendar view logic").
---

# Explain code

Turn unfamiliar or vibe-coded code into an **accountable** explanation: not just "what it does," but *why it works*, *what must stay true*, and *how to prove the explanation is correct*. This is the bridge from vibe coding (works by feel) to engineering (understood, verified, documented).

## When to Use

- The user asks `explain X`, `how does X work`, `walk me through X`, `what does X do`, or `document X`.
- **Proactively** before modifying code you don't fully understand — explain it first, then change it.
- When onboarding to an unfamiliar area of the codebase.

## Core Principle

An explanation you cannot verify is a guess. Every claim about behavior must be grounded in the actual code, and ideally backed by a guardrail (a test, a type, or a runnable command). Where a claim *can't* be verified, say so explicitly — that gap is itself a finding.

## Procedure

1. **Locate.** Resolve the target to concrete files. Use Glob/Grep to find entry points, then Read the actual source. Never explain from memory or assumption — read the code that exists now.

2. **Trace.** Follow the real control/data flow: where does input enter, how is it transformed, where does it exit (render, network, storage, return value)? Note the call sites (who uses this) and dependencies (what this uses). Reference everything as `file:line`.

3. **Extract contracts & invariants.** State the implicit contract the code relies on:
   - Inputs/outputs and their shapes (point to the types or zod schemas).
   - What must stay true for it to be correct (e.g. "the route table is the single source of truth," "exactly one canonical tag per page").
   - Assumptions and preconditions (e.g. "expects the OIDC session in sessionStorage").

4. **Map guardrails.** Identify what currently *verifies* this code — tests, type coverage, lint rules. Then name the **gaps**: behavior that is asserted in the explanation but not covered by any test or type. Gaps are the vibe-coded risk surface.

5. **Surface gotchas.** Call out anything surprising: shortcuts, tech debt, duplicated logic, stale scaffold, or behavior that contradicts how it's named. Honesty here is the whole point — don't launder hacks into clean prose.

6. **Verify.** Give the exact commands that confirm the explanation against reality, run from `webui/`:
   ```bash
   npm run type-check   # contracts hold at the type level
   npm run lint         # boundaries / conventions hold
   npm test             # behavior holds (name the specific test files if relevant)
   ```
   Run them when the explanation makes a claim you can check now. Report real output — if a guardrail is missing, say "no test covers this," don't imply one exists.

## Output Format

Structure the explanation as:

- **What it is** — one sentence: the job this code does.
- **Where it lives** — the key files, with `file:line` anchors.
- **How it works** — the traced flow, step by step.
- **Contracts & invariants** — inputs/outputs and what must stay true.
- **Dependencies** — what it uses ↑ / what uses it ↓.
- **Guardrails & gaps** — what's tested/typed, and what is *not* (the risk surface).
- **Gotchas** — shortcuts, debt, surprises.
- **Verify** — the commands (and their result if run).

Keep it as long as the code demands and no longer. A 10-line helper needs a paragraph; a feature needs the full structure.

## Optional: Bank It

If the explanation covers a durable pattern worth remembering across sessions, offer to persist it:

- A reusable pattern/gotcha → `team-lead/knowledge/<topic>.md`
- A subsystem walkthrough → `team-lead/docs/` (per `WORKING-AGREEMENTS.md` placement rules)

This is what makes understanding *compound* instead of being re-derived every session. Only bank when the user agrees and the content is genuinely reusable — don't clutter knowledge with one-off trivia.

## Notes

- Read real code; cite `file:line`. An explanation without anchors is unverifiable.
- Prefer the dedicated Glob/Grep/Read tools over shell `find`/`cat`.
- Don't fix while explaining — separate understanding from change. If the explanation surfaces a bug or a missing guardrail, note it and let the user decide whether to act.
