#!/usr/bin/env bash

set -euo pipefail

bash team-lead/scripts/check-doc-freshness.sh
bash team-lead/scripts/check-harness-consistency.sh
