#!/usr/bin/env bash

set -euo pipefail

FILES=(
  "team-lead/README.md"
  "team-lead/ARCHITECTURE.md"
  "team-lead/WORKING-AGREEMENTS.md"
  "team-lead/MEMORY.md"
  "team-lead/WORKFLOW.md"
  "team-lead/playbooks/complete-the-work.md"
  "team-lead/templates/session-summary.md"
)

if rg -n "_This document is a stub|No patterns yet|FEATURE-STATUS\.md" "${FILES[@]}"; then
  echo "Found stale or pre-harness placeholder text in required docs." >&2
  exit 1
fi
