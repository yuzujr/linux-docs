import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

function extractTitle(filePath: string, fallback: string): string {
  const content = fs.readFileSync(filePath, 'utf-8')
  const frontmatterTitle = content.match(/^---[\s\S]*?\ntitle:\s*["']?(.+?)["']?\s*\n[\s\S]*?---/m)
  if (frontmatterTitle?.[1]) return frontmatterTitle[1].trim()

  const h1 = content.match(/^#\s+(.+)$/m)
  if (h1?.[1]) return h1[1].trim()

  return fallback
}

function buildNotesSidebarItems() {
  const notesDir = path.resolve(__dirname, '../notes')
  return fs
    .readdirSync(notesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => {
      const fileName = entry.name
      const stem = fileName.replace(/\.md$/, '')
      const filePath = path.join(notesDir, fileName)
      return {
        text: extractTitle(filePath, stem),
        link: `/notes/${fileName}`
      }
    })
    .sort((a, b) => a.link.localeCompare(b.link, 'zh-Hans-CN'))
}

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
        items: buildNotesSidebarItems()
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuzujr/linux-docs' }
    ]
  },
  // 忽略死链接：https://vitepress.dev/reference/site-config#ignoredeadlinks
  ignoreDeadLinks: true
})
