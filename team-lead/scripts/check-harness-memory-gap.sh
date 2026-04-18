#!/usr/bin/env bash
# check-harness-memory-gap.sh — Detect if harness logic changed without knowledge updates.

set -euo pipefail

# Invariant: logic changes must be accompanied by knowledge updates.
LOGIC_PATHS=(
  "team-lead/scripts/"
  "team-lead/skills/"
  "team-lead/templates/"
)

KNOWLEDGE_PATHS=(
  "team-lead/knowledge/"
  "team-lead/memory/"
  "team-lead/playbooks/"
)

logic_changed=0
knowledge_changed=0

# Get staged files
staged_files=$(git diff --cached --name-only)

for file in $staged_files; do
  for path in "${LOGIC_PATHS[@]}"; do
    if [[ "$file" == "$path"* ]]; then
      logic_changed=1
      break 2
    fi
  done
done

for file in $staged_files; do
  for path in "${KNOWLEDGE_PATHS[@]}"; do
    if [[ "$file" == "$path"* ]]; then
      knowledge_changed=1
      break 2
    fi
  done
done

if [[ "$logic_changed" -eq 1 ]] && [[ "$knowledge_changed" -eq 0 ]]; then
  echo "GAP_DETECTED"
  exit 0
fi

echo "NO_GAP"
