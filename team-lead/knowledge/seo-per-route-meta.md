# Per-route SEO meta in the React 19 SPA

Pattern shipped 2026-06-11 to give each route its own title/description/canonical, instead of
every page inheriting the static homepage tags from `webui/index.html`.

## The problem

This is a client-rendered SPA: `index.html` ships one set of `<title>`, `<meta name="description">`,
canonical, OG, and Twitter tags. Every route served those *same* homepage tags — so to a crawler,
`/about`, `/calendar`, `/routes`, `/gallery` all looked like the homepage (and all claimed the
homepage as their canonical URL).

## The solution

- `webui/src/shared/seo/useSeo.ts` — a `useSeo({title, description, path, noindex})` hook whose
  `useEffect` **mutates the existing head tags in place** (querySelector → set attribute, create
  only if absent), updating title/description/canonical/OG/Twitter and toggling `robots: noindex`.
- `webui/src/shared/seo/routeMeta.ts` — `ROUTE_META` map (path → SeoMeta) + `getRouteMeta(pathname)`
  with a home fallback. Copy is written from real `content.ts` facts, not invented.
- `webui/src/layouts/PublicLayout.tsx` — one wiring point: `useSeo(getRouteMeta(useLocation().pathname))`.
- `webui/src/shared/pages/NotFound.tsx` — calls `useSeo({..., noindex:true})` (404 sits outside
  PublicLayout as the `path="*"` route, so it must opt in itself).
- Tests in `webui/src/shared/seo/seo.test.tsx`.

## Key gotcha — do NOT rely on React 19 tag hoisting here

React 19 hoists `<title>`/`<meta>`/`<link>` rendered in components into `<head>`, but it does
**not** dedupe them against the tags already hardcoded in `index.html`. Rendering SEO tags as JSX
would leave **two** titles / two descriptions per page — bad for SEO. Mutating the existing tags
(the `useEffect` approach) guarantees exactly one of each. A test asserts the in-place update
(one `meta[name=description]` after the hook runs).

## Constraints worth keeping

- Keep `ROUTE_META` in sync with the route table (`src/routes/index.ts`) — that table is the
  source of truth for which paths exist; unknown paths fall back to home.
- Descriptions ≤ ~160 chars (SERP snippet budget); a test enforces ≤170. The home description was
  trimmed 171→157 and kept identical in both `index.html` and `routeMeta.ts` to avoid a flip on load.
- Crawlers that render JS (Googlebot) see the updated tags; a non-rendering scraper sees the
  `index.html` defaults on deep links — acceptable for this site.
