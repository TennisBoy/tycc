# Google Analytics 4 — Design Spec

**Date:** 2026-05-31
**Status:** Approved (design), pending implementation
**Measurement ID:** `G-QFH9YQQJJH`

## Goal

Add Google Analytics 4 to the TYCC website so page views are tracked across the
whole single-page app — counting every client-side route change, not just the
first page load.

## Background

The site is a React 19 + Vite SPA using `BrowserRouter` (react-router v7).
Google's default gtag snippet fires a `page_view` only on the initial document
load. Because navigation between pages (Home → Routes → Calendar, etc.) happens
client-side without a full reload, those visits would go uncounted unless GA is
explicitly notified on each route change.

## Design

Two pieces, wired so the Measurement ID lives in exactly one place.

### 1. gtag bootstrap — `webui/index.html`

Standard GA4 snippet in `<head>`, ID hardcoded. Configured with
`send_page_view: false` so the initial automatic page view is suppressed and the
React hook (piece 2) owns *all* page views, including the first. This prevents
the classic SPA double-count of the landing page.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QFH9YQQJJH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-QFH9YQQJJH', { send_page_view: false });
</script>
```

### 2. Route-change hook — `webui/src/shared/analytics/usePageTracking.ts`

A hook using react-router's `useLocation()`. On every path change it fires one
`page_view` event to `gtag` with the new path, full URL, and document title.
It no-ops safely when `window.gtag` is absent (ad blockers, tests, SSR-less
edge cases).

```ts
useEffect(() => {
  window.gtag?.("event", "page_view", {
    page_path: location.pathname + location.search,
    page_location: window.location.href,
    page_title: document.title,
  });
}, [location]);
```

Mounted once inside `App.tsx`, which sits under `BrowserRouter` and is shared by
every route.

### 3. Type declaration — `webui/src/shared/analytics/gtag.d.ts`

A minimal `declare global { interface Window { gtag?: (...args: unknown[]) => void } }`
so `window.gtag` type-checks. Keeps `npm run type-check` green.

## Why this shape

- **No new dependencies** (no `react-ga4`) — ~20 lines of code we fully own.
- **ID in one place** (index.html). The hook rides the already-configured gtag,
  so it never references the ID.
- **One mount point** — the hook lives in `App.tsx`, shared by all routes.

## Files touched

| File | Change |
|------|--------|
| `webui/index.html` | Add gtag snippet to `<head>` (edit) |
| `webui/src/shared/analytics/usePageTracking.ts` | New hook |
| `webui/src/shared/analytics/gtag.d.ts` | New `window.gtag` type |
| `webui/src/App.tsx` | Add one `usePageTracking()` call |

## Verification

- `npm run type-check`, `npm run lint`, `npm test`, `npm run build` all pass.
- Manual: load the dev server, open browser devtools → Network, filter for
  `collect?v=2`; confirm one hit on first load and one per route navigation.
- In GA4: Reports → Realtime shows the active user and page-path events.

## Out of scope (YAGNI)

Custom events (button clicks, signups, route-map interactions), consent banner /
cookie management, and env-var-based config. Each is straightforward to add
later if wanted.
