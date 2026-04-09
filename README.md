# web2mm

获取文本

- 当前网页纯净正文（去广告、导航、侧边栏）. 
- 用户选择文本

把正文发给大模型，让它按层级结构总结（1 级、2 级、3 级节点）

- Markdown 标题
- JSON 结构


前端用思维导图库把结构化结果直接渲染

导出：PNG / SVG / PDF /.mm (FreeMind)




插件标准：Chrome / Edge 通用，Manifest V3（必须用 V3，否则无法上架）
wxt


正文提取：@mozilla/readability（官方标准网页正文提取，最强）

大模型：直接前端调用 OpenAI / 豆包 / 通义千问 API

思维导图渲染：mark-map（最轻量，支持 Markdown 直接转思维导图）
