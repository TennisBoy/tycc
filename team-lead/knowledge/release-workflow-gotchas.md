# Release workflow gotchas (PRs, squash merges, sitemap)

Learned 2026-11-02 → 2026-11-19 while shipping About-page, ride and SEO changes through PRs.

## Reusing a branch after its PR was squash-merged → conflicts

The repo squash-merges PRs. A squash creates a *new* commit on `main`, so the branch's original
commit is no longer an ancestor of `main`. Adding a new commit to that same branch and opening a
second PR produces "merge commit cannot be cleanly created", even though the diff looks small.

Fix: replay only the new commits onto `main`, then force-push the branch:

```bash
git fetch origin
git rebase --onto origin/main <last-already-merged-commit> <branch>
git push --force-with-lease
```

Better: after a squash merge, start the next change on a fresh branch from `main`.

## `sitemap.xml` lastmod must be regenerated *after* committing

- `webui/public/sitemap.xml` is a **committed artifact**. The Azure deploy checks out a shallow
  clone (depth 1), so `scripts/generate-sitemap.mjs` can't read git history there and keeps the
  committed file as-is.
- `lastmod` comes from the **git commit date** of each page's source files. Running
  `npm run sitemap` before committing a content change sees no new date (only line-ending noise).
- Procedure: commit the content change → `cd webui && npm run sitemap` → commit `sitemap.xml`
  ("chore(seo): regenerate sitemap lastmod") in the same PR.
- Every page imports `shared/tycc/content.ts`, so any content edit bumps every page's date.

## Azure SWA rejects duplicate routes in `staticwebapp.config.json`

SWA normalizes trailing slashes: a `/about/` rule is a duplicate of `/about`, and a duplicate
makes Azure reject the **whole config**, failing the deploy (production keeps the old build). One
rule per path; `webui/src/shared/seo/sitemap.test.ts` asserts no duplicates. Unknown paths now
return a real `statusCode: 404` (merged in PR #3).

## Merge only after the PR preview build passes

Each PR gets an Azure staging deploy ("Build and Deploy Job"). Wait for it with
`gh pr checks <n> --watch`, merge with `gh pr merge <n> --squash --delete-branch`, then watch the
`main` run and grep the live bundle (see `verifying-a-deploy.md`). Staging URL is printed in the
build log ("Visit your site at: …").
