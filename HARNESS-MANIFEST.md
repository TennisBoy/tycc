# Harness Manifest - tycc

Generated: 2026-04-18 | Type: fullstack | Scaffolded by: ystack
Learnings injected: 17

---

## Why This Exists: CI placement enforcement (.github/workflows/check-placement.yml)

**What:** GitHub Actions workflow that checks PRs and pushes for files placed outside the sanctioned `team-lead/` layout.

**Pitfall prevented:** The harness only compounds if agents can reliably find docs, memory, plans, and scripts in fixed locations. The CI check prevents invisible drift, and it explicitly guards against fail-open behavior when the base SHA is missing or `0000...` on initial or force pushes.

**Source:** `dual-allowlist-sync`, `ci-fail-open-sha`

---

## Why This Exists: Pre-commit placement hook (team-lead/scripts/install-hooks.sh)

**What:** A local pre-commit hook that mirrors the CI allowlist and blocks misplaced `team-lead/` artifacts before push.

**Pitfall prevented:** Updating CI without updating the local hook creates a frustrating split-brain workflow where the local commit is blocked before CI even runs. The hook keeps local enforcement aligned with the PR gate.

**Why both gates:** The CI workflow and the pre-commit hook enforce the same sanctioned layout. If you add a new allowed path, update BOTH files in the same change.

**Source:** `dual-allowlist-sync`

---

## Why This Exists: Three-tier knowledge system (knowledge/ + memory/ + playbooks/ + MEMORY.md)

**What:** `team-lead/knowledge/` holds persistent and generalizable patterns, `team-lead/memory/` holds contextual and time-bound state, `team-lead/playbooks/` holds executable workflows, and `team-lead/MEMORY.md` is the quick-recall surface agents read first.

**Pattern applied:** Workspace knowledge compounds only when durable facts, current context, and procedures are stored separately. Mixing them into one bucket makes agents slower and causes stale assumptions to harden.

**Source:** `knowledge-memory-playbook-distinction`

---

## Why This Exists: complete-the-work playbook (team-lead/playbooks/complete-the-work.md)

**What:** The end-of-session ritual that writes memory, refreshes the baton pass, captures a session summary, and prepares durable learnings for the next session.

**Pattern applied:** The moat of the harness is the feedback loop: each session leaves behind better context for the next agent run. The playbook is the mechanism that turns work into reusable memory instead of a dead transcript.

**Source:** `harness-compounding-loop`

---

## Why This Exists: AGENTS.md skill routing and baton-pass entry point

**What:** A project-local entry point that tells agents to read the baton pass first and routes natural-language triggers to the skills committed under `team-lead/skills/`.

**Pitfall prevented:** Codex does not load slash-commands automatically. Without explicit routing in `AGENTS.md`, skills like `complete-the-work`, `search-memory`, and `setup-skills` stay installed but undiscoverable.

**Source:** `codex-no-slash-commands`

---

## Why This Exists: _draft/ review gate for AGENTS.md and HARNESS-MANIFEST.md

**What:** The scaffold creates deterministic files immediately, but leaves the LLM-authored context files in `_draft/` for review before promotion.

**Pitfall prevented:** Mixing directory creation and provenance-writing in one opaque step makes failures harder to debug and bad manifest claims easier to ship. The hybrid flow keeps the filesystem scaffold reproducible while preserving a human review gate for the intelligence layer.

**Source:** `new-project-hybrid-approach`

---

## Why This Exists: PROVENANCE.md

**What:** A scaffold record that captures the project type, scaffold date, target path, parent ystack path, and harness package version.

**Pattern applied:** Template-based projects drift over time. Recording the scaffold origin makes future upgrade and drift tooling possible even after the codebase evolves.

**Source:** default pattern (no ystack learning on record)

---

## Why This Exists: Fullstack webui scaffold

**What:** A starter `webui/` app with React 19, Vite, TanStack Query, shadcn/ui primitives, test wiring, and feature/shared directory boundaries.

**Pattern applied:** Starting with a known-good frontend baseline avoids ad hoc folder structures and preserves the patterns already proven in previous scaffold work, including provider wiring, per-test query isolation, and shared-type support for the copied data-table components.

**Source:** default pattern (no ystack learning on record)