#!/usr/bin/env bash
# check-sync-status.sh — Count unsynced universal learnings.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SYNC_STATE="$REPO_ROOT/team-lead/memory/sync-state.json"
CHILD_LEARNINGS="$REPO_ROOT/team-lead/.gstack/projects/$(basename "$REPO_ROOT")/learnings.jsonl"

if [[ ! -f "$CHILD_LEARNINGS" ]]; then echo 0; exit 0; fi
if [[ ! -f "$SYNC_STATE" ]]; then
    wc -l < "$CHILD_LEARNINGS" | tr -d ' '
    exit 0
fi

LAST_SYNCED=$(perl -MJSON::PP -e '$/=undef; $j=decode_json(<>); print $j->{last_synced_ts}' "$SYNC_STATE")

NEW_COUNT=0
while read -r line; do
    TS=$(echo "$line" | perl -MJSON::PP -e '$j=decode_json(<>); print $j->{ts}')
    if [[ "$TS" > "$LAST_SYNCED" ]]; then
        NEW_COUNT=$((NEW_COUNT + 1))
    fi
done < "$CHILD_LEARNINGS"

echo "$NEW_COUNT"
