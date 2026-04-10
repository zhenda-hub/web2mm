# web2mm 常用命令

## 包管理器

```bash
# 安装依赖
pnpm install

# 添加运行时依赖
pnpm add <package>

# 添加开发依赖
pnpm add -D <package>
```

## 开发与构建

```bash
# 开发模式（支持 HMR 热更新）
pnpm dev

# 开发模式 - Firefox
pnpm dev:firefox

# 生产构建
pnpm build

# 生产构建 - Firefox
pnpm build:firefox

# 打包为 .zip（发布用）
pnpm zip

# 打包 - Firefox
pnpm zip:firefox
```

## 浏览器加载扩展

1. 打开 Chrome，进入 `chrome://extensions`
2. 开启右上角**开发者模式**
3. 点击**加载已解压的扩展程序**
4. 选择 `.output/chrome-mv3` 目录
5. 修改代码后点击扩展卡片上的刷新按钮即可更新

## Git

```bash
# 查看状态
git status

# 查看修改内容
git diff

# 查看暂存内容
git diff --staged

# 查看提交历史
git log --oneline

# 暂存当前修改（不提交）
git stash push -m "描述信息"

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop

# 恢复指定暂存
git stash pop stash@{0}
```

## 构建产物

| 路径 | 说明 |
|------|------|
| `.output/chrome-mv3/` | Chrome 生产构建输出 |
| `.output/firefox-mv3/` | Firefox 生产构建输出 |
| `.wxt/` | WXT 开发缓存 |

## 注意事项

- 使用淘宝镜像源：`pnpm config set registry https://registry.npmmirror.com`
- `node_modules/`、`.output/`、`.wxt/` 已在 `.gitignore` 中忽略
