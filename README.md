# web2mm

将网页内容总结为交互式思维导图的浏览器扩展。

## 功能

- **内容获取**：支持整页纯净正文（自动去广告/导航/侧边栏）和用户选中文本两种来源
- **AI 总结**：调用大模型按层级结构总结，输出 Markdown 或 JSON 格式
- **思维导图**：实时渲染交互式思维导图，支持缩放、折叠、拖拽
- **多平台模型**：硅基流动（SiliconFlow）+ OpenRouter，一个 API 兼容格式
- **免费服务**：内置免费额度（每日限额），开箱即用
- **导出**：PNG / SVG / PDF / .mm (FreeMind)
- **主题**：支持 light/dark 主题，可手动切换或自动跟随
- **浏览器**：Chrome + Edge（Manifest V3）

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式（支持 HMR）
pnpm dev

# 生产构建
pnpm build

# 打包发布
pnpm zip
```

### 加载扩展

1. Chrome 打开 `chrome://extensions`
2. 开启右上角**开发者模式**
3. 点击**加载已解压的扩展程序**，选择 `.output/chrome-mv3/` 目录

## 使用

1. 打开任意文章/博客页面
2. 点击扩展图标，侧边栏打开
3. 点击**总结当前页面**（整页）或**总结选中文本**（先选中文字）
4. AI 总结后自动渲染为思维导图
5. 可在**设置**中配置 API Key 和选择模型

### AI 配置

| 平台 | 说明 | 推荐模型 |
|------|------|----------|
| 硅基流动 | 国内平台，部分模型免费 | Qwen2.5-7B、DeepSeek-V3 |
| OpenRouter | 海外平台，200+ 模型 | GPT-4o Mini、Gemini Flash、Claude Haiku |

不填 API Key 可使用免费服务（每日限额）。

## 技术栈

| 组件 | 选择 | 说明 |
|------|------|------|
| 框架 | [WXT](https://wxt.dev/) | Vite 驱动的扩展开发框架 |
| 语言 | TypeScript | 全项目类型安全 |
| 内容提取 | @mozilla/readability | Firefox 阅读模式同款 |
| 思维导图 | markmap | Markdown → 思维导图 |
| AI 集成 | OpenAI 兼容 API | 硅基流动/OpenRouter 统一格式 |
| 免费 backend | Cloudflare Workers | 代理 API Key + 限流 |

## 项目结构

```
src/
├── entrypoints/
│   ├── background.ts          # Service Worker: 消息路由 + AI 调用
│   ├── content.ts             # Content Script: 页面内容提取
│   └── sidepanel/             # 侧边栏 UI
│       ├── index.html
│       ├── main.ts
│       └── style.css
└── lib/
    ├── ai/                    # AI 集成 (provider, prompt, platforms, models)
    ├── extract/               # 内容提取 (readability, selection)
    ├── markmap/               # 思维导图渲染
    └── storage/               # 设置持久化
```

## License

Apache-2.0
