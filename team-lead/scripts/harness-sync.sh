#!/usr/bin/env bash
# harness-sync.sh — Upstream universal learnings to the parent ystack.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PROVENANCE_FILE="$REPO_ROOT/team-lead/PROVENANCE.md"
SYNC_STATE="$REPO_ROOT/team-lead/memory/sync-state.json"
# CHILD_LEARNINGS="$REPO_ROOT/team-lead/.gstack/projects/$(basename "$REPO_ROOT")/learnings.jsonl" # This path might vary, let's make it robust

# 1. Read Parent Path from PROVENANCE.md
if [[ ! -f "$PROVENANCE_FILE" ]]; then
    echo "ERROR: PROVENANCE.md not found at $PROVENANCE_FILE" >&2
    exit 1
fi

PARENT_PATH=$(grep "Parent ystack path" "$PROVENANCE_FILE" | cut -d'|' -f3 | tr -d ' ')
PROJECT_SLUG=$(grep "Project slug" "$PROVENANCE_FILE" | cut -d'|' -f3 | tr -d ' ')

if [[ -z "$PARENT_PATH" || ! -d "$PARENT_PATH" ]]; then
    echo "ERROR: Parent ystack path '$PARENT_PATH' is invalid or unreachable." >&2
    exit 1
fi

echo "Syncing to parent ystack at: $PARENT_PATH"

# 2. Sync learnings.jsonl
# We need to find the child's learnings file. 
# It's usually ~/.gstack/projects/<slug>/learnings.jsonl
# But for simplicity in this first version, let's assume the symlink exists in team-lead/.gstack/
CHILD_LEARNINGS="$REPO_ROOT/team-lead/.gstack/projects/$(basename "$REPO_ROOT")/learnings.jsonl"
PARENT_LEARNINGS="$PARENT_PATH/team-lead/.gstack/projects/coralcoffee-ystack/learnings.jsonl"

if [[ -f "$CHILD_LEARNINGS" && -f "$PARENT_LEARNINGS" ]]; then
    echo "Processing learnings..."
    # Initialize sync state if missing
    if [[ ! -f "$SYNC_STATE" ]]; then echo '{"last_synced_ts": "1970-01-01T00:00:00Z"}' > "$SYNC_STATE"; fi
    
    LAST_SYNCED=$(perl -MJSON::PP -e '$/=undef; $j=decode_json(<>); print $j->{last_synced_ts}' "$SYNC_STATE")
    
    # Filter new learnings and append to parent
    # Adding from_project field
    NEW_COUNT=0
    while read -r line; do
        TS=$(echo "$line" | perl -MJSON::PP -e '$j=decode_json(<>); print $j->{ts}')
        if [[ "$TS" > "$LAST_SYNCED" ]]; then
            # Add from_project field to the JSON line
            NEW_LINE=$(echo "$line" | perl -MJSON::PP -e '$j=decode_json(<>); $j->{from_project} = "'$PROJECT_SLUG'"; print encode_json($j)')
            echo "$NEW_LINE" >> "$PARENT_LEARNINGS"
            NEW_COUNT=$((NEW_COUNT + 1))
        fi
    done < "$CHILD_LEARNINGS"
    
    echo "Upstreamed $NEW_COUNT new learnings."
    
    # Update sync state with current time
    CURRENT_TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo "{\"last_synced_ts\": \"$CURRENT_TS\"}" > "$SYNC_STATE"
fi

# 3. Sync Universal Knowledge Notes
echo "Processing universal knowledge notes..."
KNOWLEDGE_DIR="$REPO_ROOT/team-lead/knowledge"
PARENT_KNOWLEDGE_DIR="$PARENT_PATH/team-lead/knowledge"

find "$KNOWLEDGE_DIR" -maxdepth 1 -name "*.md" -print0 | xargs -0 grep -l "scope: universal" 2>/dev/null || true | while read -r note; do
    if [[ -z "$note" ]]; then continue; fi
    FILENAME=$(basename "$note")
    TARGET_NAME="upstream--$PROJECT_SLUG--$FILENAME"
    cp "$note" "$PARENT_KNOWLEDGE_DIR/$TARGET_NAME"
    echo "Copied $FILENAME -> $TARGET_NAME"
done

echo "Done."
