# Visual verification on Windows (Playwright + PIL)

Environment gotchas for screenshotting the running app and processing images on this Windows box.

## Playwright MCP wants the 'chrome' channel, which won't install

- The Playwright MCP server is configured for `channel: 'chrome'` and fails with
  "Chromium distribution 'chrome' is not found".
- `npx playwright install chrome` **fails without admin** ("Failed to install Google Chrome").
- `npx playwright install chromium` works (downloads a headless shell) but the MCP still
  demands the chrome channel.

## Cleaner workaround (preferred, 2026-06): playwright-core + bundled chromium

- `npx playwright install chromium` downloads a Chromium build to
  `~/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe` (version dir varies).
- In a throwaway dir under the git-ignored `raw/` folder: `npm init -y && npm install playwright-core`.
- Write a `.mjs` script that launches it with an explicit path (use forward slashes; heredocs
  mangle backslashes — write the file with the Write tool, not `cat <<EOF`):
  ```js
  import { chromium } from "playwright-core";
  const b = await chromium.launch({ executablePath: "C:/Users/yinxi/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe" });
  ```
- Start the app first: `cd webui && npm start` (run_in_background), wait ~8s, then screenshot
  `http://localhost:8001/...`. `fullPage:true` for whole pages; set viewport 1440×900 (desktop)
  / 390×844 (mobile). Read the PNG back to inspect. Click tabs via `getByRole("tab",{name})`.
- Keeping the temp project under `raw/` means it's gitignored — no eslint/commit cleanup needed
  (unlike stray files in `webui/`). Stop the dev server after: PowerShell
  `Get-NetTCPConnection -LocalPort 8001 -State Listen | %{ Stop-Process -Id $_.OwningProcess -Force }`.

## Workaround (older): drive Playwright directly from the npx cache

- A usable `playwright` with a matching browser build sits in the npx cache. Find it:
  `~/AppData/Local/npm-cache/_npx/<hash>/node_modules/playwright` (the build that matched the
  installed browser was under hash `e41f203b7505f1fb`; verify by trial — a mismatched build
  errors "Executable doesn't exist").
- Write a small `.cjs` script that loads it via `createRequire` and launches `chromium`:
  ```js
  const { createRequire } = require('module');
  const req = createRequire('C:/Users/<user>/AppData/Local/npm-cache/_npx/<hash>/node_modules/');
  const { chromium } = req('playwright');
  ```
- Run it from `webui/` with `node script.cjs`. Use it to screenshot `http://localhost:8001`
  (dev server) or a built preview. Read the PNG back with the Read tool to inspect.
- CLEANUP: delete temp `_*.cjs` / `_*.png` from `webui/` before linting/committing — eslint
  lints stray `.cjs` files (`no-require-imports`) and fails.

## Contact sheets

- To review many candidate images in one Read, build a tiny HTML grid and screenshot it via
  the same script (cheaper than reading each image).

## Image processing: PIL is available

- Python + PIL works (`python -c "from PIL import Image; ..."`). Used it to make the logo's
  white background transparent (set pixels with r,g,b > 238 to alpha 0) so it stops showing a
  mismatched white box in the header.

## Stock imagery

- Unsplash CDN photo IDs load directly via `https://images.unsplash.com/photo-<id>?...`.
  Downloaded a batch to `webui/public/images/` as placeholders; the club will replace them
  with real photos/video.
