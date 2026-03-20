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

function noteItem(fileName: string, fallback: string) {
  const notesDir = path.resolve(__dirname, '../notes')
  const filePath = path.join(notesDir, fileName)
  return {
    text: extractTitle(filePath, fallback),
    link: `/notes/${fileName}`
  }
}

function buildStructuredSidebar() {
  const orderedNotes = [
    'preface.md',
    'linux-survival-guide.md',
    '重返archlinux.md',
    'nix-cli-guide.md'
  ]
  const orderedSet = new Set(orderedNotes)
  const extraNotes = buildNotesSidebarItems().filter((item) => {
    const fileName = item.link.replace('/notes/', '')
    return !orderedSet.has(fileName)
  })

  const sections = [
    {
      text: '开始',
      items: [noteItem('preface.md', '写在前面')]
    },
    {
      text: '通用手册',
      items: [noteItem('linux-survival-guide.md', 'Linux 生存手册')]
    },
    {
      text: '折腾记录',
      items: [noteItem('重返archlinux.md', '重返 Arch Linux 实录')]
    },
    {
      text: 'NixOS / Nix',
      items: [noteItem('nix-cli-guide.md', 'Nix / NixOS 常用命令整理')]
    }
  ]

  if (extraNotes.length > 0) {
    sections.push({
      text: '其他笔记',
      items: extraNotes
    })
  }

  return sections
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

    nav: [
      { text: '首页', link: '/' },
      { text: '开始阅读', link: '/notes/preface.md' }
    ],

    sidebar: buildStructuredSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuzujr/linux-docs' }
    ]
  },
  // 忽略死链接：https://vitepress.dev/reference/site-config#ignoredeadlinks
  ignoreDeadLinks: true
})
