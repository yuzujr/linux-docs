import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Linux 生存手册",
  description: "Linux 使用记录与问题解决整理",
  lang: 'zh-CN',
  // 应使用仓库名：https://vitepress.dev/reference/site-config#base
  base: '/linux-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    sidebar: [
      {
        text: '目录',
        items: [
          { text: 'Linux 生存手册', link: '/notes/linux-survival-guide.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuzujr/linux-docs' }
    ]
  },
  // 忽略死链接：https://vitepress.dev/reference/site-config#ignoredeadlinks
  ignoreDeadLinks: true
})
