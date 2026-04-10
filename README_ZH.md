# Web2MM

将网页内容总结为交互式思维导图的浏览器扩展。 [English](README.md)

## 功能

- **智能提取**：自动去除广告、导航、侧边栏等噪音，提取纯净正文。也支持选中文本总结。
- **AI 总结**：调用大模型按层级结构总结，输出 Markdown 格式。
- **交互式思维导图**：实时渲染可缩放、可折叠、可拖拽的思维导图，支持亮色/暗色主题。
- **双平台**：硅基流动（SiliconFlow）+ OpenRouter，统一 OpenAI 兼容格式。
- **免费额度**：不填 API Key 也有免费额度可用，开箱即用。
- **智能缓存**：24 小时 AI 响应缓存，避免重复调用。
- **开源**：Apache-2.0 许可证，无数据收集。

## 安装

### 从 Release 安装（推荐）

1. 从 [最新发布](https://github.com/zhenda-hub/web2mm/releases/latest) 下载 `web2mm-*-chrome.zip`
2. 解压文件
3. 打开 `chrome://extensions`（或 `edge://extensions`）
4. 开启右上角**开发者模式**
5. 点击**加载已解压的扩展程序**，选择解压后的目录

### 从源码构建

```bash
pnpm install
pnpm build
# 加载 .output/chrome-mv3/ 目录
```

## 使用

1. 打开任意文章或博客页面
2. 点击扩展图标，侧边栏打开
3. 点击**总结当前页面**（整页）或先选中文字再点击**总结选中文本**
4. AI 自动生成思维导图
5. 在**设置**中配置 API Key 和选择模型

### AI 平台

| 平台 | 说明 | 推荐模型 |
|------|------|----------|
| 硅基流动 | 国内平台，部分模型免费 | Qwen2.5-7B、DeepSeek-V3 |
| OpenRouter | 海外平台，200+ 模型 | GPT-4o Mini、Gemini Flash、Claude Haiku |

## 技术栈

| 组件 | 选择 | 说明 |
|------|------|------|
| 框架 | [WXT](https://wxt.dev/) | Vite 驱动的扩展开发框架 |
| 语言 | TypeScript | 全项目类型安全 |
| 内容提取 | @mozilla/readability | Firefox 阅读模式同款 |
| 思维导图 | markmap | Markdown → 思维导图 |
| AI 集成 | OpenAI 兼容 API | 双平台统一格式 |

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

## 开发

```bash
pnpm dev              # 开发模式（支持 HMR）
pnpm build            # 生产构建
pnpm build -b firefox # Firefox 构建
pnpm zip              # 打包发布
```

## 链接

- **产品主页**：https://zhenda-hub.github.io/web2mm/
- **隐私政策**：https://zhenda-hub.github.io/web2mm/privacy.html
- **问题反馈**：https://github.com/zhenda-hub/web2mm/issues

## 许可证

Apache-2.0
