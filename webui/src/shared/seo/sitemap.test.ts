import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { routes } from "@/routes";
import { ROUTE_META } from "./routeMeta";
import { SITE_URL } from "./useSeo";

/**
 * The route table is the source of truth for which paths exist. Three
 * artifacts have to agree with it, and two of them live outside the type
 * system (a generated XML file and a hosting config), so they are asserted
 * here rather than left to review.
 */
const routePaths = routes.flatMap((layout) => layout.routes).map((route) => route.path);

const readPublic = (file: string) =>
  readFileSync(resolve(__dirname, "../../../public", file), "utf8");

describe("sitemap.xml", () => {
  const sitemap = readPublic("sitemap.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("lists exactly the routes in the route table", () => {
    expect(new Set(locs)).toEqual(
      new Set(routePaths.map((path) => `${SITE_URL}${path === "/" ? "/" : path}`)),
    );
  });

  it("gives every url a lastmod date", () => {
    const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    expect(lastmods).toHaveLength(locs.length);
    for (const date of lastmods) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("staticwebapp.config.json", () => {
  const config = JSON.parse(readPublic("staticwebapp.config.json")) as {
    routes: { route: string; rewrite: string }[];
    responseOverrides: Record<string, { statusCode: number }>;
  };

  it("rewrites every known route to the SPA shell", () => {
    const configured = new Set(config.routes.map((r) => r.route));
    for (const path of routePaths) {
      expect(configured).toContain(path);
    }
    for (const route of config.routes) {
      expect(route.rewrite).toBe("/index.html");
    }
  });

  it("lists no route twice, including trailing-slash variants", () => {
    // Azure normalizes trailing slashes before matching, so "/about/" is the
    // same rule as "/about". Listing both isn't redundant-but-harmless — SWA
    // rejects the whole config ("a rule was already processed with a duplicate
    // route") and fails the deploy, which is how this once took production
    // down. One rule per path covers both spellings.
    const routes = config.routes.map((r) => r.route.replace(/(.)\/$/, "$1"));
    expect(routes).toHaveLength(new Set(routes).size);
  });

  it("serves unknown paths as a real 404, not a soft 404", () => {
    expect(config.responseOverrides["404"].statusCode).toBe(404);
  });
});

describe("ROUTE_META", () => {
  it("covers every route in the route table", () => {
    expect(new Set(Object.keys(ROUTE_META))).toEqual(new Set(routePaths));
  });
});
