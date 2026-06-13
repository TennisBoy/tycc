#!/usr/bin/env bash
# install-hooks.sh — Install the team-lead placement pre-commit hook.
#
# Run once per clone. The installed .git/hooks/pre-commit hook is not committed to version
# control, so this script must be re-run on each fresh clone.
# Aborts if a pre-commit hook already exists to avoid silent overwrites.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "ERROR: Not inside a git repository." >&2
  exit 1
fi

HOOK_TARGET="$REPO_ROOT/.git/hooks/pre-commit"

if [[ -f "$HOOK_TARGET" ]]; then
  echo "ERROR: A pre-commit hook already exists at $HOOK_TARGET" >&2
  echo "       Review it before installing. To replace it, remove it first:" >&2
  echo "         rm $HOOK_TARGET" >&2
  exit 1
fi

cat > "$HOOK_TARGET" <<'HOOK'
#!/usr/bin/env bash
# team-lead placement enforcement hook.
# Installed by team-lead/scripts/install-hooks.sh — not committed to version control.

set -euo pipefail

# Sanctioned subdirectories under team-lead/
ALLOWED_SUBDIRS=(
  "team-lead/status/"
  "team-lead/memory/"
  "team-lead/knowledge/"
  "team-lead/.gstack/"
  "team-lead/docs/sessions/"
  "team-lead/docs/specs/"
  "team-lead/docs/plans/"
  "team-lead/playbooks/"
  "team-lead/templates/"
  "team-lead/scripts/"
  "team-lead/skills/"
  "team-lead/docs/"
)

# Top-level files allowed directly under team-lead/
ALLOWED_TOPLEVEL=(
  "team-lead/README.md"
  "team-lead/TODOS.md"
  "team-lead/WORKING-AGREEMENTS.md"
  "team-lead/ARCHITECTURE.md"
  "team-lead/MEMORY.md"
  "team-lead/ROADMAP.md"
  "team-lead/WORKFLOW.md"
  "team-lead/SKILLS-MANAGEMENT.md"
  "team-lead/SKILLS-CUSTOM.md"
  "team-lead/SKILLS-GUIDE.md"
  "team-lead/PROMPT-GUIDE.md"
  "team-lead/FIRST-STEPS.md"
  "team-lead/PROJECT.md"
  "team-lead/PROVENANCE.md"
  "team-lead/HARNESS-MANIFEST.md"
)

violations=()

while IFS= read -r file; do
  # Only check files under team-lead/
  if [[ "$file" != team-lead/* ]]; then
    continue
  fi

  # Check top-level allowlist
  allowed=0
  for toplevel in "${ALLOWED_TOPLEVEL[@]}"; do
    if [[ "$file" == "$toplevel" ]]; then
      allowed=1
      break
    fi
  done
  [[ "$allowed" -eq 1 ]] && continue

  # Check sanctioned subdirectory prefixes
  for subdir in "${ALLOWED_SUBDIRS[@]}"; do
    if [[ "$file" == ${subdir}* ]]; then
      allowed=1
      break
    fi
  done
  [[ "$allowed" -eq 1 ]] && continue

  violations+=("$file")
done < <(git diff --cached --name-only --diff-filter=d)

if [[ ${#violations[@]} -gt 0 ]]; then
  echo "ERROR: The following files are not in a sanctioned team-lead/ location:" >&2
  for v in "${violations[@]}"; do
    echo "  $v" >&2
  done
  echo "" >&2
  echo "See team-lead/WORKING-AGREEMENTS.md and team-lead/ARCHITECTURE.md for the approved harness layout." >&2
  exit 1
fi
HOOK

chmod +x "$HOOK_TARGET"
echo "Pre-commit hook installed at $HOOK_TARGET"
echo "Note: this hook is per-clone and must be re-installed on each fresh clone."
