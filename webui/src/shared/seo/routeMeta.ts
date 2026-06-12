import { SITE_NAME, type SeoMeta } from "./useSeo";

/**
 * Per-route SEO copy, keyed by route path. The route table in
 * `src/routes/index.ts` is the source of truth for which paths exist; keep this
 * map in sync when adding a page. Unknown paths fall back to the home entry.
 */
export const ROUTE_META: Record<string, SeoMeta> = {
  "/": {
    path: "/",
    title: `${SITE_NAME} — Youth Road Cycling in Toronto & the GTA`,
    description:
      "Toronto Youth Cycling Club (TYCC) is a youth-run road cycling community in Toronto and the GTA — group rides for all levels, route maps, and a ride calendar.",
  },
  "/about": {
    path: "/about",
    title: `About — ${SITE_NAME}`,
    description:
      "Meet the youth-run club behind TYCC — our story, mission, and the student co-founders building an open, inclusive road cycling community across Toronto and the GTA.",
  },
  "/calendar": {
    path: "/calendar",
    title: `Ride Calendar — ${SITE_NAME}`,
    description:
      "Upcoming TYCC group rides across Toronto and the GTA — dates, meetup spots, distances, and difficulty for our 2026 season. All levels welcome.",
  },
  "/routes": {
    path: "/routes",
    title: `Cycling Routes — ${SITE_NAME}`,
    description:
      "The road cycling routes TYCC rides around Toronto and the GTA — from a 12 km park loop to a 163 km ride to Niagara Falls, with Google Maps directions and distances.",
  },
  "/gallery": {
    path: "/gallery",
    title: `Gallery — ${SITE_NAME}`,
    description:
      "Photos from Toronto Youth Cycling Club rides and events across Toronto and the GTA — the crew, the routes, and the road.",
  },
};

/** Resolve SEO metadata for a pathname, falling back to the home entry. */
export const getRouteMeta = (pathname: string): SeoMeta =>
  ROUTE_META[pathname] ?? ROUTE_META["/"];
