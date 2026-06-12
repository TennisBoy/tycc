# Google Analytics MCP — setup procedure & gotchas

How to wire Google's `analytics-mcp` (the `googleanalytics/google-analytics-mcp` server,
installed via pipx at `C:\Users\yinxi\.local\bin\analytics-mcp.exe`) into Claude Code on
this Windows machine. Captured 2026-06-11 while doing it for the TYCC GA account
(**account id 396328696**, measurement id `G-QFH9YQQJJH`).

## TL;DR decision: use a service account, not user login

The MCP authenticates via **Application Default Credentials (ADC)**, which can be either a
user login or a service-account key. **Use a service-account key.** User login is blocked
(see gotcha #1).

## The working path (service account)

1. **Install gcloud** — `winget install --id Google.CloudSDK -e --silent`. It installs
   per-user to `C:\Users\yinxi\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\` and
   adds that to the **persistent user PATH** — but an already-running shell won't see it
   (PATH is captured at process start). Either open a fresh terminal or prepend it inline:
   `$env:Path = "C:\Users\yinxi\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin;" + $env:Path`.
2. **User logs in (CLI auth)** — `gcloud auth login`. Interactive (browser) — the user must
   do this; no automation can. After this, gcloud commands run as them from any shell of the
   same Windows user (creds live in the per-user gcloud config, not per-shell).
3. **Create a project** — `gcloud projects create tycc-ga-mcp --name="TYCC Analytics MCP"`.
   No billing needed; Analytics read APIs are free. (Created project number 342022493945.)
4. **Enable both APIs** — `gcloud services enable analyticsdata.googleapis.com analyticsadmin.googleapis.com --project=tycc-ga-mcp`.
5. **Create the service account + key** (store the key OUTSIDE the repo):
   - `gcloud iam service-accounts create ga-mcp --display-name="GA MCP Reader" --project=tycc-ga-mcp`
   - `gcloud iam service-accounts keys create "C:\Users\yinxi\keys\ga-mcp-key.json" --iam-account="ga-mcp@tycc-ga-mcp.iam.gserviceaccount.com"`
6. **Register the MCP (local scope)** —
   `claude mcp add google-analytics -s local -e GOOGLE_APPLICATION_CREDENTIALS="C:\Users\yinxi\keys\ga-mcp-key.json" -- "C:\Users\yinxi\.local\bin\analytics-mcp.exe"`.
   Writes to `~/.claude.json` (NOT a repo `.mcp.json`) — correct, because the key path is
   machine-specific and must never be committed. New MCP servers need a Claude restart / `/mcp`
   to load in-session.
7. **Grant the SA access in GA** — Admin ⚙️ → Account access management → **+** → Add users →
   `ga-mcp@tycc-ga-mcp.iam.gserviceaccount.com` → role **Viewer**. **This is the only step a
   human must do in the GA UI** and the one that snagged (gotcha #2).

## Verify without loading the MCP in-session

Use the pipx venv's Python (has the GA client libs) to hit the Admin API directly:

```python
# python = C:\Users\yinxi\pipx\venvs\analytics-mcp\Scripts\python.exe
import os; os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\yinxi\keys\ga-mcp-key.json"
from google.analytics.admin_v1beta import AnalyticsAdminServiceClient
print(list(AnalyticsAdminServiceClient().list_account_summaries()))
```

Empty list + no error = key/credentials/APIs all good, SA just has no GA access yet.
This isolates "is our setup broken?" from "is the GA grant done?".

## Gotchas

1. **User ADC login is blocked for Analytics.** `gcloud auth application-default login
   --scopes=...analytics.readonly...` fails with *"This app tried to access sensitive info…
   Google blocked this access."* The shared gcloud OAuth client isn't verified for sensitive
   scopes like Analytics. Service accounts skip the consent/verification wall entirely (they
   authenticate with their own key, not on a human's behalf), so they avoid this. The price is
   that an admin must explicitly add the SA to the GA property (step 7) — security moves from a
   login-time consent screen to an admin-granted permission. (A user-login path IS possible by
   creating your OWN OAuth client + consent screen with yourself as a test user, then
   `gcloud auth application-default login --client-id-file=...`; more setup, kept as Plan B.)
2. **GA rejects a brand-new SA email: "This email doesn't match a Google Account."**
   Propagation lag — can take minutes; we saw it persist >15 min. Confirmed not a typo
   (`gcloud iam service-accounts list`) and the user was a verified **Administrator** on the
   same account. Most common real cause: **multiple Google accounts signed into the browser** —
   retry in an **Incognito window** signed in as only the GA-admin account, and **type** the
   email (don't paste/select autocomplete). Try Property-level access mgmt if Account-level
   keeps failing.
3. **Key is a secret.** Never commit `ga-mcp-key.json`. Keep it under `C:\Users\yinxi\keys\`
   (outside the repo). The MCP registration lives in `~/.claude.json`, also outside the repo.
