#!/usr/bin/env node
/**
 * Regenerates `webui/public/sitemap.xml` with a real <lastmod> per URL, taken
 * from the git commit date of the sources that actually render each page.
 *
 * Rather than hand-listing dependencies (which goes stale silently), each
 * route's sources are the transitive closure of its page component's `@/`
 * imports — so a change to `shared/tycc/rides.ts` correctly bumps the pages
 * that render rides, and nothing else.
 *
 * Run via `npm run sitemap`, or implicitly through `prebuild`. The generated
 * file is a **committed artifact**: CI checks out a shallow clone (depth 1), so
 * there every file looks like it changed in the same single commit. When the
 * history isn't usable the script leaves the committed sitemap alone rather
 * than overwriting it with wrong dates.
 *
 * Keep ROUTES in sync with the route table (`src/routes/index.ts`) — the test
 * in `src/shared/seo/sitemap.test.ts` fails if they drift.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webuiDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webuiDir, "..");
const srcDir = resolve(webuiDir, "src");
const sitemapPath = resolve(webuiDir, "public/sitemap.xml");

const SITE_URL = "https://tycctoronto.com";

/**
 * One entry per route in the route table. `entry` is the page component whose
 * import graph is crawled; `assets` are non-imported files the page renders
 * (referenced by URL string, so they can't be found by following imports).
 */
const ROUTES = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    entry: "src/features/home/pages/HomePage.tsx",
    assets: ["webui/public/images"],
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.7",
    entry: "src/features/public/pages/AboutPage.tsx",
    assets: ["webui/public/images"],
  },
  {
    path: "/calendar",
    changefreq: "weekly",
    priority: "0.8",
    entry: "src/features/public/pages/CalendarPage.tsx",
    assets: [],
  },
  {
    path: "/routes",
    changefreq: "monthly",
    priority: "0.8",
    entry: "src/features/public/pages/RoutesPage.tsx",
    assets: [],
  },
  {
    path: "/gallery",
    changefreq: "monthly",
    priority: "0.6",
    entry: "src/features/public/pages/GalleryPage.tsx",
    assets: ["webui/public/images"],
  },
];

/** Resolve a `@/foo/bar` specifier to a real file, mirroring the vite alias. */
const resolveAlias = (specifier) => {
  const base = resolve(srcDir, specifier.slice("@/".length));
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    resolve(base, "index.ts"),
    resolve(base, "index.tsx"),
  ];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
};

/** Transitive closure of `@/` imports reachable from `entry`, repo-relative. */
const dependencyClosure = (entry) => {
  const seen = new Set();
  const queue = [resolve(webuiDir, entry)];

  while (queue.length > 0) {
    const file = queue.pop();
    if (!file || seen.has(file)) continue;
    seen.add(file);

    const source = readFileSync(file, "utf8");
    for (const [, specifier] of source.matchAll(/from\s+"(@\/[^"]+)"/g)) {
      const resolved = resolveAlias(specifier);
      if (resolved && !seen.has(resolved)) queue.push(resolved);
    }
  }

  return [...seen].map((f) => relative(repoRoot, f).replaceAll("\\", "/"));
};

const git = (args) => execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();

/** True when git history is present and deep enough for per-file dates. */
const historyIsUsable = () => {
  try {
    return git(["rev-parse", "--is-shallow-repository"]) === "false";
  } catch {
    return false;
  }
};

/** Latest commit date (YYYY-MM-DD) touching any of `sources`. */
const lastCommitDate = (sources) => {
  const date = git(["log", "-1", "--format=%cs", "--", ...sources]);
  if (!date) throw new Error(`no commit found for: ${sources.join(", ")}`);
  return date;
};

const renderSitemap = (entries) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ path, lastmod, changefreq, priority }) =>
      [
        "  <url>",
        `    <loc>${SITE_URL}${path}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");

const main = () => {
  if (!historyIsUsable()) {
    console.log("sitemap: shallow clone or no git history — keeping the committed sitemap.xml");
    return;
  }

  const entries = ROUTES.map((route) => {
    const sources = [...dependencyClosure(route.entry), ...route.assets];
    return { ...route, sources, lastmod: lastCommitDate(sources) };
  });

  const next = renderSitemap(entries);
  const current = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : null;

  if (next === current) {
    console.log("sitemap: already up to date");
  } else {
    writeFileSync(sitemapPath, next);
    console.log(`sitemap: wrote ${entries.length} urls`);
  }

  for (const entry of entries) {
    console.log(`  ${entry.path.padEnd(10)} ${entry.lastmod}  (${entry.sources.length} sources)`);
  }
};

main();
