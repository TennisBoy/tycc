#!/usr/bin/env bash

set -euo pipefail

REQUIRED_PATHS=(
  "team-lead/WORKFLOW.md"
  "team-lead/docs/plans/active/README.md"
  "team-lead/docs/plans/completed/README.md"
  "team-lead/status/CAPABILITY-STATUS.md"
  "team-lead/knowledge/README.md"
  "team-lead/memory/README.md"
  "team-lead/scripts/verify-all.sh"
  "team-lead/scripts/check-doc-freshness.sh"
  "team-lead/scripts/check-harness-consistency.sh"
)

for path in "${REQUIRED_PATHS[@]}"; do
  test -e "$path" || { echo "Missing $path" >&2; exit 1; }
done
