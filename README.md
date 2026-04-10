# Web2MM

A browser extension that summarizes webpage content into interactive mind maps. [中文文档](README_ZH.md)

## Features

- **Smart Extraction**: Automatically removes ads, navigation, and sidebar noise to extract clean article text. Also supports user-selected text.
- **AI Summarization**: Calls LLMs to generate hierarchical summaries in Markdown format.
- **Interactive Mind Map**: Real-time rendering with zoom, fold, and drag support. Light/dark theme toggle.
- **Dual Platform**: SiliconFlow (China) + OpenRouter (International), unified OpenAI-compatible API.
- **Free Tier**: Built-in free quota — works out of the box without an API key.
- **Smart Cache**: 24-hour AI response cache to avoid redundant API calls.
- **Open Source**: Apache-2.0 license. No data collection.

## Install

### From Release (Recommended)

1. Download `web2mm-*-chrome.zip` from [Latest Release](https://github.com/zhenda-hub/web2mm/releases/latest)
2. Unzip the file
3. Open `chrome://extensions` (or `edge://extensions`)
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** and select the unzipped folder

### From Source

```bash
pnpm install
pnpm build
# Load .output/chrome-mv3/ as unpacked extension
```

## Usage

1. Open any article or blog page
2. Click the extension icon to open the side panel
3. Click **Summarize** (full page) or select text first, then click **Summarize Selection**
4. AI generates a mind map automatically
5. Configure API key and model in **Settings**

### AI Platforms

| Platform | Description | Recommended Models |
|----------|-------------|-------------------|
| SiliconFlow | China-based, some models free | Qwen2.5-7B, DeepSeek-V3 |
| OpenRouter | International, 200+ models | GPT-4o Mini, Gemini Flash, Claude Haiku |

## Tech Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| Framework | [WXT](https://wxt.dev/) | Vite-based extension framework |
| Language | TypeScript | Full type safety |
| Extraction | @mozilla/readability | Same engine as Firefox Reader Mode |
| Mind Map | markmap | Markdown to mind map |
| AI | OpenAI-compatible API | Unified format for both platforms |

## Project Structure

```
src/
├── entrypoints/
│   ├── background.ts          # Service Worker: message routing + AI calls
│   ├── content.ts             # Content Script: page content extraction
│   └── sidepanel/             # Side panel UI
│       ├── index.html
│       ├── main.ts
│       └── style.css
└── lib/
    ├── ai/                    # AI integration (provider, prompt, platforms, models)
    ├── extract/               # Content extraction (readability, selection)
    ├── markmap/               # Mind map rendering
    └── storage/               # Settings persistence
```

## Development

```bash
pnpm dev              # Dev mode with HMR (Chrome)
pnpm build            # Production build
pnpm build -b firefox # Firefox build
pnpm zip              # Package for Chrome Web Store
```

## Links

- **Website**: https://zhenda-hub.github.io/web2mm/
- **Privacy Policy**: https://zhenda-hub.github.io/web2mm/privacy.html
- **Issues**: https://github.com/zhenda-hub/web2mm/issues

## License

Apache-2.0
