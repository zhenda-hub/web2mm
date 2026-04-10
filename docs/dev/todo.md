# TODO

## Phase 7: 导出功能

### 现状

- HTML 中已有 4 个导出按钮（PNG/SVG/PDF/.mm），但 `main.ts` 中无事件监听
- markmap-view 无内置导出功能，需自行实现
- `renderMindmap()` 返回 Markmap 实例但未存储引用

### 待做

1. **存储 Markmap 实例** — `main.ts` 中保存 `renderMindmap()` 返回值，供导出时访问 SVG
2. **安装依赖** — `html-to-image`（PNG）、`jspdf`（PDF）、`file-saver`（文件下载）
3. **添加权限** — `wxt.config.ts` 中添加 `downloads` 权限（或用 Blob + data URL 绕过）
4. **实现导出函数**：
   - PNG — SVG 序列化 → Canvas → PNG
   - SVG — 序列化 SVG 元素（含内联样式）
   - PDF — Canvas → jspdf
   - .mm — 从 transformer 数据转 FreeMind XML 格式
5. **绑定事件** — `main.ts` 中为 4 个导出按钮添加 click 事件

## Phase 6: 免费服务后端

- `src/lib/ai/free-service.ts` 当前为占位文件
- 计划用 Cloudflare Worker 代理 AI API，让用户无需自带 Key
- 未开始
