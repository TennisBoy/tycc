#!/usr/bin/env bash
# upgrade-harness.sh — Pull latest harness artifacts into a new git branch.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PROVENANCE_FILE="$REPO_ROOT/team-lead/PROVENANCE.md"

if [[ ! -f "$PROVENANCE_FILE" ]]; then
  echo "ERROR: PROVENANCE.md not found." >&2
  exit 1
fi

PARENT_PATH=$(grep "Parent ystack path" "$PROVENANCE_FILE" | cut -d'|' -f3 | tr -d ' ')
PROJECT_TYPE=$(grep "Project type" "$PROVENANCE_FILE" | cut -d'|' -f3 | tr -d ' ')

if [[ ! -d "$PARENT_PATH" ]]; then
  echo "ERROR: Parent ystack path is invalid: $PARENT_PATH" >&2
  exit 1
fi

PARENT_VERSION=$(cat "$PARENT_PATH/team-lead/VERSION" 2>/dev/null || echo "unknown")

# Invariant files (safe to auto-update)
INVARIANTS=(
  "WORKFLOW.md"
  "scripts/install-hooks.sh"
  "scripts/verify-all.sh"
  "scripts/check-doc-freshness.sh"
  "scripts/check-harness-consistency.sh"
  "playbooks/complete-the-work.md"
  "templates/session-summary.md"
  "scripts/harness-sync.sh"
  "scripts/check-sync-status.sh"
  "scripts/check-harness-drift.sh"
  "scripts/upgrade-harness.sh"
)

# Check if repo is clean
if ! git diff-index --quiet HEAD --; then
  echo "ERROR: Working directory is not clean. Commit or stash changes before upgrading." >&2
  exit 1
fi

BRANCH_NAME="harness-upgrade-$(date +%Y-%m-%d)"
echo "Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo "Upgrading invariants to v$PARENT_VERSION..."

for rel in "${INVARIANTS[@]}"; do
  # Check base then type template
  SRC=""
  if [[ -f "$PARENT_PATH/team-lead/templates/projects/base/team-lead/$rel" ]]; then
    SRC="$PARENT_PATH/team-lead/templates/projects/base/team-lead/$rel"
  elif [[ -f "$PARENT_PATH/team-lead/templates/projects/$PROJECT_TYPE/team-lead/$rel" ]]; then
    SRC="$PARENT_PATH/team-lead/templates/projects/$PROJECT_TYPE/team-lead/$rel"
  fi

  if [[ -n "$SRC" ]]; then
    mkdir -p "$(dirname "$REPO_ROOT/team-lead/$rel")"
    cp "$SRC" "$REPO_ROOT/team-lead/$rel"
    echo "  Updated: team-lead/$rel"
  fi
done

# Update VERSION in PROVENANCE
# macOS sed needs empty string for -i extension or it appends backup
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/Harness Package Version | .*/Harness Package Version | $PARENT_VERSION |/" "$PROVENANCE_FILE"
else
  sed -i "s/Harness Package Version | .*/Harness Package Version | $PARENT_VERSION |/" "$PROVENANCE_FILE"
fi

echo ""
echo "Upgrade complete. Review changes and merge branch: $BRANCH_NAME"
