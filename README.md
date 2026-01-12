# Linux 生存手册

Linux 使用记录与问题解决整理

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 预览生产版本
pnpm docs:preview
```

## 部署

项目配置了 GitHub Actions 自动部署。当推送到 `main` 分支并且 `docs/` 目录下的文件发生变更时，会自动构建并部署到 GitHub Pages。

## 预览
`https://yuzujr.github.io/linux-docs/`

`https://www.sheot.cn/linux-docs/`

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 前端框架
- [Vite](https://vitejs.dev/) - 构建工具
