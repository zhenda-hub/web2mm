# Markmap 暗色主题背景色修复

## 问题

markmap-toolbar 内置的暗色主题切换按钮点击后，思维导图容器背景色不会变暗，一直是白色。

## 根因

markmap-toolbar 的暗色切换代码：

```js
// node_modules/markmap-toolbar/dist/index.mjs:220
document.documentElement.classList.toggle("markmap-dark");
```

`markmap-dark` 类被添加到 `<html>` 元素上，而不是容器或 SVG 上。markmap-toolbar 自带的 `style.css` 只处理了 `.mm-toolbar` 自身的暗色样式，**不会改变容器/SVG 的背景色**。

## 解决方案

CSS 选择器必须匹配 `<html>` 上的 `markmap-dark` 类：

```css
/* 默认亮色背景 */
#mindmap-container {
  background: #ffffff;
}

/* 暗色背景 - 当 toolbar 点击暗色按钮时 */
html.markmap-dark #mindmap-container {
  background: #1e1e2e;
}
```

## 参考来源

- GitHub Issue: https://github.com/markmap/markmap/issues/239
- markmap-toolbar 源码: `document.documentElement.classList.toggle("markmap-dark")`
- markmap-toolbar 自带 CSS: `.markmap-dark .mm-toolbar { ... }` — 仅处理 toolbar 按钮样式
