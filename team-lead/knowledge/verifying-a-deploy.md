# How to verify a deploy actually worked (plain-language guide)

Written 2026-06-12, the first time we deployed and then *checked* the deploy on the TYCC site.
This is the "how do I know it really went live?" guide, written to be read by a human, not a robot.

---

## The big idea

When you `git push`, you did **not** update the website. You updated the **code** on GitHub.
Something else then has to take that code, build it, and copy the result onto the live server.

So "did my change go live?" is really **two separate questions**, answered by **two separate systems**:

1. **GitHub** — "Did the deploy robot run and succeed?"
2. **The live server (Azure / tycctoronto.com)** — "Are you actually serving the new code?"

When both say yes *about the same commit*, the deploy is confirmed end to end.

---

## Question 1 — Ask GitHub: "did the deploy run and pass?"

Every time you push to `main`, GitHub runs automated jobs called **Actions** (a "run" = one execution
of a job, e.g. the Azure deploy, or the placement check). Each run ends as ✅ success or ❌ failure.

There's an official command-line tool called **`gh`** (the GitHub CLI) already installed and logged in
on this machine. It talks to GitHub and returns the same info you'd see on the website, as plain text.

What I ran:

```bash
gh run list --branch main --limit 5
```
→ lists recent runs with their **name**, **status** (in-progress / completed), **conclusion**
  (success / failure), and **which commit** triggered each one.

To read *why* something failed:

```bash
gh run view <run-id> --log-failed
```
→ downloads the failed job's log (its console output) so you can read the actual error message.

That's the whole trick for GitHub's side: there's a tool whose entire job is to answer
"what happened with my Actions?" — I just asked it.

---

## Question 2 — Ask the live site: "are you serving the new code?"

The website isn't on GitHub — it's served by Azure at tycctoronto.com. There's no special tool here,
so you check it the same way a browser does under the hood: **download the files and look inside them.**

**Step 1 — download the homepage the server is really serving** (`curl` fetches a URL and saves it):
```bash
curl -s https://tycctoronto.com/ -o live_idx.html
```
This is the exact bytes a visitor's browser would receive.

**Step 2 — follow the trail to the JavaScript.** On this site the real content (and the SEO logic)
lives in a JavaScript file, not the HTML. The HTML just names it, e.g. `assets/index-DsWO4cb1.js`.
So read that name out of the HTML, then download that file too:
```bash
curl -s https://tycctoronto.com/assets/index-DsWO4cb1.js -o live_bundle.js
```

**Step 3 — search inside it** (`grep` finds text in a file):
```bash
grep -F "Meet the youth-run club behind TYCC" live_bundle.js
```
If that exact sentence (the About-page description we wrote) is inside the file the production server
just handed over, then the new code is genuinely deployed. I searched for all five route descriptions
— all five were present. ✅

---

## The clever bit: how the two systems "connect"

They connect through the **commit** and a **content fingerprint**:

- That random-looking part of the filename — `index-DsWO4cb1.js` — is a **hash**: a fingerprint
  computed from the file's contents. Change the code, and the fingerprint changes.
- GitHub told me its robot built commit `16d2bdd` and succeeded.
- The live server handed me a file whose fingerprint **matched the file my own local build produced**
  from that same commit.
- Same fingerprint = same code. So the thing GitHub built is the thing Azure is serving.

---

## The honest limitation

`curl` **downloads** the file but doesn't **run** it. The per-page SEO tags only appear after the
JavaScript **executes in a browser**. So `curl` + `grep` proves *"the code that sets the SEO is present
and deployed"* — but not *"I watched the About page's title change in a live browser."*

The gold-standard version of that needs a real browser automation tool (Playwright), which couldn't
run here because its Chromium isn't installed on this machine. So we verified one level down (the
shipped code) and trusted the 27 passing tests to confirm that code *behaves* correctly. Strong
evidence — just not an actual rendered screenshot.

---

## What we actually found on 2026-06-12

- ✅ **Deploy green:** Azure Static Web Apps CI/CD succeeded for the deploy commits.
- ✅ **SEO live:** all five per-route descriptions were present in the production JavaScript bundle.
  (First grep was a false alarm — I searched for page *titles*, which are built at runtime from a
  template and never appear as one literal string. Searching the *descriptions*, which are real
  literal strings, confirmed it. Lesson: verification catches your own mistakes too.)
- 🐛 **Found & fixed a CI bug:** a second check ("Check team-lead Placement") kept going red because
  two gates that should match had drifted — the pre-commit hook allowed `team-lead/status/` but the
  CI allowlist didn't. So commits touching `CAPABILITY-STATUS.md` passed locally but failed in CI.
  Added `team-lead/status/` to the CI list to re-sync them.

---

## The one-sentence summary

**`gh` asks GitHub "did you build and deploy this commit?", and `curl` + `grep` asks the live server
"are you actually serving that commit's code?" — when both say yes about the same commit, the deploy
is confirmed.**
