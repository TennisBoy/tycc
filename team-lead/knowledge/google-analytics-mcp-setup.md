# Google Analytics MCP — setup procedure & gotchas

How to wire Google's `analytics-mcp` (the `googleanalytics/google-analytics-mcp` server,
installed via pipx at `C:\Users\yinxi\.local\bin\analytics-mcp.exe`) into Claude Code on
this Windows machine. First captured 2026-06-11; **rewritten 2026-06-12 once it actually
worked.** Target: the TYCC GA account **account id 396328696**, property **539644755**
("TYCC Toronto Website"), measurement id `G-QFH9YQQJJH`.

## TL;DR decision: log in as yourself (NOT a service account)

The MCP authenticates via **Application Default Credentials (ADC)**. Two flavours exist —
a **user login** or a **service-account key**. **Use the user login.** We burned two
sessions on the service-account ("robot") route and it dead-ended in the GA UI; the user
login worked in one sitting. The robot post-mortem is at the bottom — read it so nobody
retries the dead end.

Why user login wins here: the human (`william.xhyin@gmail.com`) is **already an
Administrator** on the GA account. Logging in as them inherits that access — there is **no
"add a user to GA" step** to perform (and no GA-UI grant to get stuck on). The service
account, by contrast, is a brand-new identity that GA's "add user" form kept rejecting.

## The working path (user login + own OAuth client)

The shared gcloud OAuth client is blocked for Analytics' sensitive scope (gotcha #1), so you
create **your own** OAuth client and authorize past the unverified-app screen as its own
test user.

1. **Install gcloud** — `winget install --id Google.CloudSDK -e --silent`. Installs per-user
   to `C:\Users\yinxi\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\` and adds it to the
   **persistent user PATH** — but an already-running shell won't see it (PATH is captured at
   process start). Open a fresh terminal, or prepend inline:
   `$env:Path = "C:\Users\yinxi\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin;" + $env:Path`.
2. **Pick/confirm a Cloud project** — reuse `tycc-ga-mcp` (project number 342022493945) or make
   a new one. The project is just the quota/billing container; it does **not** need to be owned
   by the same identity that owns Google Analytics.
3. **Enable both APIs** —
   `gcloud services enable analyticsdata.googleapis.com analyticsadmin.googleapis.com --project=tycc-ga-mcp`.
4. **Configure the OAuth consent screen** (Console → APIs & Services → OAuth consent screen,
   a.k.a. the **"Google Auth Platform"** pages):
   - **User type:** External. Fill app name + your email.
   - **Audience → Test users:** add `william.xhyin@gmail.com` (the exact account you'll log in
     with). Without this you get `Error 403: access_denied` at consent.
   - ⭐ **Data Access → Add scopes:** register `https://www.googleapis.com/auth/analytics.readonly`.
     **This was the final unlock.** The scope must be declared here AND requested in the login
     command (step 6). If it's only in the command, Google refuses with a scope-mismatch error.
     Leave the app in **Testing** — no need to publish.
5. **Create the OAuth client** — Console → Credentials → **+ Create Credentials → OAuth client
   ID → Application type: Desktop app** → **Download JSON** → save OUTSIDE the repo, e.g.
   `C:\Users\yinxi\keys\ga-oauth-client.json`. (Desktop-app client secrets are low-sensitivity:
   useless without also passing your consent screen + test-user list. Still, keep the file off-repo.)
6. **Log in as yourself (interactive — a human must do this; no automation can).** Run it from
   the Claude prompt with a leading `!` so the output lands in-session. **Quote the `--scopes`
   value** — PowerShell treats the comma as its array operator and silently drops the second
   scope otherwise (gotcha #2):
   ```
   gcloud auth application-default login --scopes="https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform" --client-id-file="C:\Users\yinxi\keys\ga-oauth-client.json"
   ```
   Browser → pick `william.xhyin@gmail.com` → on "Google hasn't verified this app" click
   **Advanced → Go to … (unsafe) → Allow**. It prints `Credentials saved to file: [PATH]` — the
   ADC file, default location `C:\Users\yinxi\AppData\Roaming\gcloud\application_default_credentials.json`.
7. **Register / point the MCP at ADC (local scope).** The MCP must NOT have
   `GOOGLE_APPLICATION_CREDENTIALS` set — with it unset, the Google auth library auto-discovers
   the ADC file from step 6. In `~/.claude.json`, the `google-analytics` server's `env` is `{}`:
   ```json
   "google-analytics": {
     "type": "stdio",
     "command": "C:\\Users\\yinxi\\.local\\bin\\analytics-mcp.exe",
     "args": [],
     "env": {}
   }
   ```
   (If migrating from the robot setup, just delete the `GOOGLE_APPLICATION_CREDENTIALS` entry.)
   Lives in `~/.claude.json`, NOT a repo `.mcp.json` — correct, machine-specific, never committed.
   **Restart Claude / `/mcp`** to reload — a running MCP process keeps its old credentials.

## Verify

In-session, just call the MCP: `get_account_summaries` should return the TYCC account
(`396328696`) and property (`539644755`). `[]` (empty, no error) means it authenticated but
that identity has no GA access — almost always: the MCP wasn't restarted, or
`GOOGLE_APPLICATION_CREDENTIALS` is still set and pinning it to a stale key.

## Gotchas

1. **The shared gcloud OAuth client is blocked for Analytics.** `gcloud auth
   application-default login --scopes=...analytics.readonly...` with the *default* client fails:
   *"This app tried to access sensitive info… Google blocked this access."* Fix: use your **own**
   OAuth client (`--client-id-file=...`) with yourself as a test user — you can then click past
   the unverified-app screen (a bypass only the client's own owner/testers get).
2. **PowerShell eats the comma in `--scopes`.** `--scopes=a,b` unquoted → PowerShell array
   operator splits it, gcloud sees only `a` and errors *"cloud-platform scope is required but
   not requested."* **Quote the whole value:** `--scopes="a,b"`.
3. **`Error 403: access_denied` at consent** = you're not on the app's **Test users** list (or
   signed in as a different account). Add the exact login account under Audience → Test users.
4. **Scope must be registered, not just requested.** Adding `analytics.readonly` under
   **Data Access** on the consent screen is what finally made it work — requesting it only in
   the CLI is not enough.
5. **`get_account_summaries` returns `[]`** → restart the MCP, and confirm
   `GOOGLE_APPLICATION_CREDENTIALS` is unset in `~/.claude.json` (a leftover key path silently
   overrides your user login).

## Post-mortem: the service-account ("robot") route we abandoned

Tried first, across two sessions; **do not retry without reason.** Plan was: create a service
account `ga-mcp@tycc-ga-mcp.iam.gserviceaccount.com` + JSON key, point the MCP at the key via
`GOOGLE_APPLICATION_CREDENTIALS`, then add the SA as a **Viewer** in GA. The key authenticated
fine against Google's API, but the **GA "Add users" form kept rejecting the SA email** —
*"This email doesn't match a Google Account"* — and it never cleared (we suspected propagation
lag / multi-account browser state; Incognito + typing the email didn't fix it within our window).
Because the human already had Administrator access, switching to "log in as yourself" removed
the entire blocked step. The SA + key were deleted 2026-06-12 (key file removed from
`C:\Users\yinxi\keys\`; delete the SA itself in IAM & Admin → Service Accounts). Lesson: **when
a human with the needed access is in the loop, prefer user-login ADC over a service account —
the SA only adds a grant step that can get stuck.**
