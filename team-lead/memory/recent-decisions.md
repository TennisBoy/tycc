# Recent Decisions

Updated: 2026-06-12

Decisions made in recent sessions. Remove entries older than ~2 sprints.

## 2026-06-12 (GA MCP go-live, journal kit)

- **GA MCP auth = ADC user-login, NOT a service account (reverses the 2026-06-11 call).** The
  robot route dead-ended: GA's add-user form kept rejecting the SA email. Since the human is
  already a GA Administrator, logging in as them inherits that access and removes the blocked
  grant step entirely. Implemented with the user's **own** OAuth client (the shared gcloud client
  is blocked for the Analytics sensitive scope) + `analytics.readonly` registered under the
  consent screen's **Data Access**. Service account + key **deleted**. Rule of thumb recorded:
  when a human with the needed access is in the loop, prefer user-login over a service account.
- **Created a standalone `project-journal-kit`** (new sibling repo at
  `C:\Users\yinxi\source\repos\project-journal-kit`, first commit `a6f6f74`) — a portable,
  dependency-free 5-file journaling template (BATON/STATE/KNOWLEDGE/decisions/RITUAL) distilling
  the good parts of `team-lead/` with no generator or external links. For reuse across future
  projects; not wired into tycc.
- **Confirmed tycc has no live code connection to ystack** — only a path string in
  `PROVENANCE.md` plus three opt-in scripts that read it. No submodule/symlink/remote/dependency;
  deleting ystack would not affect tycc.
- **Deployed the 2026-06-11 work** (merged branch → `main`, fast-forward, pushed) after a green
  gate. Verified end-to-end: Azure CI/CD success + the per-route SEO descriptions present in the
  live JS bundle.
- **Fixed a CI placement allowlist drift bug.** `.github/workflows/check-placement.yml` was missing
  `team-lead/status/` (the pre-commit hook had it), so every commit touching `CAPABILITY-STATUS.md`
  passed locally but failed CI. Added it to re-sync the two gates (per AGENTS.md). Captured the
  whole verification method in `knowledge/verifying-a-deploy.md`.
- **Auto-commit preference (tycc only):** I commit proactively with descriptive messages without
  asking each time, but **never auto-push** (pushing `main` auto-deploys to production, so it stays
  a deliberate step). A Stop-hook auto-committer was built, tested, then **removed at the user's
  request** — too noisy. The "I commit as I work" behavior stays.

## 2026-06-11 (SEO refine, explain-code skill, GA MCP wiring)

- **GA MCP auth = service account, not user login.** ~~User chose the "robot" method.~~
  **SUPERSEDED 2026-06-12** — reversed to ADC user-login (see above) after the GA add-user form
  kept rejecting the SA. Original rationale: user ADC login with the *shared* gcloud client is
  blocked for the Analytics sensitive scope; an *own* OAuth client gets past that, which is what
  ultimately worked.
- **GA Cloud project = `tycc-ga-mcp`** (no billing; Analytics read APIs are free). SA key stored
  **off-repo** at `C:\Users\yinxi\keys\`; MCP registered at **local** scope (`~/.claude.json`),
  not a committed `.mcp.json`, because the key path is machine-specific.
- **Per-route SEO via in-place head-tag mutation**, not React 19 tag hoisting (hoisting would
  duplicate the static `index.html` tags). Driven from `PublicLayout` via `useLocation`. 404 gets
  `noindex`. See `knowledge/seo-per-route-meta.md`.
- **`explain-code` skill** added under the project's own `team-lead/skills/` convention (registered
  in `SKILLS-CUSTOM.md` + `AGENTS.md` routing), not the Claude-plugin skill format — to match the
  existing workspace skill system. Purpose: verified code explanations to drive vibe→engineering.
- **This work committed on branch `codex/add-contact-phone-number`, NOT merged to `main`.** So it
  is committed but **not deployed** (only `main` auto-deploys). Merging to main would also ship the
  unrelated "add contact phone number" commit — left as a deliberate, supervised step.

## 2026-06-02/04 (content, media, SEO, refinement)

- **Auto-deploy every change** for the session; `settings.json` `defaultMode: bypassPermissions`
  enabled the no-prompt flow.
- Route cards show **one-way** distances (routes are point-to-point); computed with **BRouter**,
  not estimated. June 5 ride corrected to ~19 km one way (the flyer's ~40 km is round trip).
- Gallery uses **real club photos** from the Drive "WEBSITE MEDIA" folder, converted to WebP and
  compressed; stock placeholders dropped. No video for now (storage).
- SEO canonical/OG use the **apex** `https://tycctoronto.com` (confirm apex vs `www`).
- **Google Analytics**: take ownership of the **existing** property (no delete, keep data); wire
  the MCP via a service-account **Viewer**, not by recreating the property.
- Calendar **always opens Month view** on every viewport (user reverted a mobile→List default).
- Exec-title reconciliation (Co-founder/Exec vs "co-president" bios) deferred — needs exec input.

## 2026-05-30/31 (redesign)

- Full redesign, but **keep** the calendar component, the green/amber color family, and the
  minimal footer. Flip the palette to white-dominant with **amber leading, green secondary**.
- All copy must come from the club's **real** material (`/raw`); no AI-invented marketing copy.
- Hero voice locked to "Ride with us." + the verbatim mission; left-aligned text on a road photo.
- Draw design cues from Ontario Cycling (minimal big-photo hero) + NICA (mission-as-headline);
  skip pure Google Maps for routes.
- Routes use free Google Maps directions embeds, **card-driven** (no tab switcher); a Google
  My Maps embed is the planned fix for hiding alternative-route lines (Strava deferred — needs sub).
- Reviews section removed (no real reviews yet); achievements folded into the stats.
- Team: roles set by hand — Nathan/Roger/Gavin = Co-founder, Cooper = Exec, William = Developer
  & Exec (no photo/bio yet). Members can exist without a photo/bio (placeholder avatar).
- Homepage shows only the next **upcoming** ride; past rides stay only in the calendar.
- Discord→calendar bot: prefer a `/ride` slash command over AI-reading free-form posts;
  Google Calendar option rejected. (Not yet built — pending exec decision.)
- Branch `redesign-first-draft` was fast-forward merged to `main`. The redesign was later pushed
  to origin and a Google Analytics 4 PR merged in (reconciled via merge into local main).
- Use the real blue Discord brand logo (`/discord.png`) everywhere Discord appears (header,
  footer, mobile menu, connect card), not the generic chat icon.
- **Working mode (from 2026-05-31): work directly on production.** Commit AND push to `main` by
  default (auto-deploys to the official domain tycctoronto.com via Azure). No more draft-only /
  hold-for-review. The official Discord server is the live target for bot work too.

## 2026-04-18 (session 2)

- Use May 2026 for first sample ride since `MonthCalendar` only renders May–June 2026.
- Keep ride details Toronto-specific to set a realistic precedent for future entries.

## 2026-04-18 (session 1)

- Use the homepage foundation as the first implementation slice before backend setup.
- Keep the first route public and let the site render even if OIDC is not configured yet.
- Establish the initial TYCC brand direction around club navy, high-vis gold, and ride red.
