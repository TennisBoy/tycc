#!/usr/bin/env bash
# check-harness-drift.sh — Detect differences between this project and parent ystack templates.

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
LOCAL_VERSION=$(grep "Harness Package Version" "$PROVENANCE_FILE" | cut -d'|' -f3 | tr -d ' ')

echo "Parent Version: $PARENT_VERSION"
echo "Local Version:  $LOCAL_VERSION"

# Define templates to compare against
BASE_TEMPLATE="$PARENT_PATH/team-lead/templates/projects/base/team-lead"
TYPE_TEMPLATE="$PARENT_PATH/team-lead/templates/projects/$PROJECT_TYPE/team-lead"

# Directories to ignore (project-specific data)
IGNORE_DIRS=("memory" "knowledge" "status" "docs/sessions" "docs/plans" "docs/specs")

echo ""
echo "--- Drift Report ---"

# Helper to diff a file
check_file() {
  local rel_path="$1"
  local source_file="$2"
  local target_file="$3"

  if [[ ! -f "$target_file" ]]; then
    echo "[MISSING]  $rel_path"
  elif ! diff -q "$source_file" "$target_file" >/dev/null; then
    echo "[MODIFIED] $rel_path"
  fi
}

# Check files in templates
for template in "$BASE_TEMPLATE" "$TYPE_TEMPLATE"; do
  [[ ! -d "$template" ]] && continue
  find "$template" -type f | while read -r src; do
    rel="${src#$template/}"
    
    # Skip ignored dirs
    skip=0
    for dir in "${IGNORE_DIRS[@]}"; do
      if [[ "$rel" == "$dir"/* ]]; then skip=1; break; fi
    done
    [[ $skip -eq 1 ]] && continue

    check_file "team-lead/$rel" "$src" "$REPO_ROOT/team-lead/$rel"
  done
done
