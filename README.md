# HiddenThings

A Manifest V3 browser extension for passive and active OSINT recon. It checks whether the site you're currently browsing exposes standard, hidden, or sensitive files.

## Features

- **Passive scan** — runs automatically when a page finishes loading. Checks ~55 standard/discovery paths (`robots.txt`, `sitemap.xml`, `.well-known/security.txt`, and a wide range of other `.well-known/` identifiers), plus any extra paths discovered by parsing `robots.txt` itself (`Disallow`/`Allow`/`Sitemap` entries).
- **Advanced recon** (opt-in) — on-demand scan of ~220 bug-bounty-style paths: `.git/`, `.env*`, SSH keys, TLS certs, cloud credentials, shell history files, CMS configs, debug/monitoring endpoints, log files, and more.
- **Custom wordlist** (opt-in) — paste your own paths (one per line) and scan them against the current site.
- **JS source map discovery** (opt-in) — reads `<script src>` tags on the active tab and checks for matching `.js.map` files, a common source-code leak.
- **Soft-404 filtering** — fires a request to a guaranteed-nonexistent path and compares status/content-length against every result, so sites that return `200 OK` for literally any URL (SPA catch-all routing, custom error pages, etc.) don't flood you with false positives.
- Only shows what's actually found — no noise from 404s or blocked requests.
- Direct link + one-click download for every file found.
- Dark/light theme, adjustable text size, adjustable popup width, custom accent color.

## Install (developer mode)

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome (or the equivalent page in another Chromium-based browser).
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Visit any site — the icon badge shows how many files were found.

## Permissions

| Permission | Why |
|---|---|
| `host_permissions` (`http://*/*`, `https://*/*`) | Required to run the passive scan automatically on any site you visit, and to fetch cross-origin without being blocked by CORS. |
| `storage` | Saves your settings (theme, toggles, custom wordlist) and caches scan results per site. |
| `activeTab` | Reads the URL of the tab the popup is opened for. |
| `downloads` | Powers the one-click download button next to each found file. |
| `scripting` | Reads `<script src>` tags from the active tab for the source map discovery feature. |

## Architecture

```
manifest.json
background/background.js   service worker: passive scan, badge, session cache
lib/scanner.js              shared fetch logic, target wordlists, soft-404 filter
popup/                      UI: results, advanced recon, custom wordlist, settings
```

No content script, no code injected into the pages you visit — everything runs from the extension's own background/popup context using `fetch()`.

## Disclaimer

Intended for authorized security testing, bug bounty programs, and OSINT research on sites you own or are permitted to test. You are responsible for complying with the terms of service and applicable laws for any site you scan.

## Credits

Built by [Camael](https://github.com/camael-off).
