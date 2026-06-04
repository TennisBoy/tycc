# Media, route-distance, SEO & analytics pipelines (TYCC)

Reusable techniques established in the 2026-06 session. All temp tooling lives in the
git-ignored `raw/` folder so it never ships or gets committed.

## Importing club photos from Google Drive → gallery

The club drops real photos into a Google Drive folder ("WEBSITE MEDIA"). Pulling them through
the Drive MCP as base64 is **not viable** (multi-MB images = ~700k tokens each). Instead:

1. The user downloads the Drive folder as a zip and drops it in `raw/photos/`.
2. Unzip into a throwaway dir under `raw/` (e.g. `raw/photos/_work/in`).
3. In that dir: `npm init -y && npm install sharp heic-convert`.
4. Convert: HEIC via `heic-convert` (browsers can't display HEIC), everything else via `sharp`;
   `.rotate()` (EXIF auto-orient), `.resize(1600, 1600, {fit:"inside", withoutEnlargement:true})`,
   `.webp({quality:82})`. Output `gallery-NN.webp` into `webui/public/images/`.
   Result last run: 13 photos, 54 MB → ~5 MB.
5. Record **intrinsic width/height** from `sharp`'s output info into each `GalleryItem`
   (`width`/`height` fields) and render them on `<img>` to prevent layout shift (CLS).
6. To review/caption many at once cheaply: composite thumbnails into one contact-sheet JPG with
   sharp and Read that single image.

## Real cycling route distances (BRouter)

Route cards show **one-way** road distances. Don't eyeball them — route the actual waypoints:
- BRouter (free, cycling-aware): `https://brouter.de/brouter?lonlats=lon,lat|lon,lat|...&profile=trekking&alternativeidx=0&format=geojson`
- Distance (metres) = `features[0].properties["track-length"]`. Node 24 has global `fetch`.
- Needs network → run the Bash tool with `dangerouslyDisableSandbox: true`.
- Watch the framing: a "~40 km" ride is usually **round trip**; the point-to-point route is ~half.

## SEO / link-preview share cards (SPA on Azure SWA)

In `webui/index.html`: meta `description`, `<link rel="canonical">`, Open Graph + Twitter
`summary_large_image` tags, and a JSON-LD `SportsOrganization` block (name, logo, `sameAs`
socials, area). Generate the **1200×630 `og-image.jpg`** from the hero photo + a wordmark by
compositing an SVG (gradient + text) over the photo with sharp.
Add `robots.txt` + `sitemap.xml` to `webui/public/`. **Crucial:** add `txt`, `xml`, `webp`,
`jpeg` to the `navigationFallback.exclude` glob in `webui/public/staticwebapp.config.json` so
crawlers get the real files instead of the SPA `index.html`. Canonical/OG currently use the
apex `https://tycctoronto.com` — confirm whether the site serves apex vs `www`.

## Google Analytics MCP (googleanalytics/google-analytics-mcp)

- Package `analytics-mcp` (PyPI). Installed via `python -m pipx install analytics-mcp` →
  `C:\Users\yinxi\.local\bin\analytics-mcp.exe`. It READS GA4 data via the Admin + Data APIs —
  separate from the on-site `gtag.js` (which only collects).
- Needs: a Google Cloud project (Admin API + Data API enabled) + a service-account JSON key,
  and that service account added as a **Viewer** on the GA4 property (done by a GA admin).
- Register: `claude mcp add analytics-mcp -s local -e GOOGLE_APPLICATION_CREDENTIALS="<json>" -e GOOGLE_PROJECT_ID="<id>" -- "C:\Users\yinxi\.local\bin\analytics-mcp.exe"`.
- Read-only; most useful once the site has traffic history.

## Local file-loss gotcha

Files under `C:\Users\yinxi\source\repos\tycc` occasionally vanished from the working tree
(suspected OneDrive/AV) — e.g. `gallery-13.webp` and `community.jpg` disappeared mid-session.
Restore from git history (`git checkout <ref> -- <path>`). Consider excluding the repo from
OneDrive/AV scanning.
