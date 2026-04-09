# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install          # Install dependencies (uses npmmirror registry)
pnpm dev              # Dev mode with HMR (Chrome)
pnpm build            # Production build → .output/chrome-mv3/
pnpm zip              # Package as .zip for Chrome Web Store
pnpm build -b firefox # Firefox build
```

Load extension in Chrome: `chrome://extensions` → Developer mode → Load unpacked → select `.output/chrome-mv3/`.

## Architecture

WXT-based Manifest V3 browser extension. Vite handles bundling; TypeScript throughout.

### Message Flow

```
Side Panel ──sendMessage──→ Background ──sendMessage──→ Content Script
(main.ts)     (runtime)     (background.ts)   (tabs)     (content.ts)
                                │
                                ├── reads settings (storage)
                                └── calls AI API (fetch)
```

1. **`src/entrypoints/background.ts`** — Service worker. Routes messages between side panel and content script. Orchestrates: extract content → read settings → call AI → return markdown. Uses `browser.scripting.executeScript` to dynamically inject content script if not already loaded.

2. **`src/entrypoints/content.ts`** — Runs in page context. Handles three actions: `ping` (detection), `extract` (Readability or getSelection), `detectTheme` (page color-scheme detection).

3. **`src/entrypoints/sidepanel/`** — Full UI with 5 views (welcome/loading/result/settings/error). `main.ts` manages state transitions and event wiring. CSS uses `data-theme` attribute on `<html>` for light/dark theming.

### Core Modules (`src/lib/`)

- **`ai/provider.ts`** — Generic OpenAI-compatible fetch client. Both SiliconFlow and OpenRouter share the same `/v1/chat/completions` format, differentiated by `baseURL` from `platforms.ts`.
- **`ai/prompt.ts`** — System prompt instructs AI to output hierarchical Markdown (`#` → `##` → `###` → `-`) for markmap consumption.
- **`ai/free-service.ts`** — Placeholder for Cloudflare Worker proxy (not yet deployed).
- **`extract/readability.ts`** — Clones `document` (Readability mutates DOM), returns `{ title, textContent, url, source }`.
- **`extract/selection.ts`** — `window.getSelection()` with 10-char minimum threshold.
- **`markmap/render.ts`** — Transforms markdown via `markmap-lib`, renders SVG via `markmap-view`, attaches `markmap-toolbar`. Reads `data-theme` attribute for color palette selection.
- **`storage/settings.ts`** — `chrome.storage.local` wrapper with `loadSettings()`/`saveSettings()`. Settings shape: `{ platform, apiKey, model, theme }`.

## Key Conventions

- AI providers are OpenAI-compatible; add new ones by adding entry to `platforms.ts` + `models.ts`.
- WXT auto-discovers entrypoints from `src/entrypoints/` — do not manually register in manifest.
- Content script communication must go through background (side panel cannot directly message content scripts).
- `git stash` is used for temporarily shelving theme work; check `git stash list` before major changes.
