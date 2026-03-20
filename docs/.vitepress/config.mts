import { defineConfig } from 'vitepress'

const sidebar = [
  {
    text: '开始',
    items: [
      { text: '目录', link: '/notes/' },
      { text: '前言', link: '/notes/preface.md' }
    ]
  },
  {
    text: '网络与连接',
    items: [
      { text: '吉林大学校园网认证：Drcom 与有线配置', link: '/notes/network/jlu-drcom.md' },
      { text: 'Linux 代理工具：Clash Verge Rev / mihomo / metacubexd', link: '/notes/network/proxy.md' }
    ]
  },
  {
    text: '显卡与图形',
    items: [
      { text: 'Nvidia 独显优先：Wayland 下的基础设置', link: '/notes/graphics/nvidia-wayland.md' },
      { text: 'Linux QQ 在 Wayland 下花屏：强制切到 Nvidia EGL', link: '/notes/graphics/linuxqq-egl.md' }
    ]
  },
  {
    text: '桌面与交互',
    items: [
      { text: '自动登录环境下的 Keyring 冲突', link: '/notes/desktop/keyring-conflict.md' },
      { text: '登录界面只保留需要的桌面环境', link: '/notes/desktop/remove-session-entries.md' },
      { text: 'KDE 调成 Windows 风格 Alt+Tab', link: '/notes/desktop/kde-alt-tab.md' },
      { text: 'Linux 下鼠标指针主题与大小设置', link: '/notes/desktop/cursor.md' }
    ]
  },
  {
    text: '系统、磁盘与引导',
    items: [
      { text: 'Btrfs 在线迁移系统到新分区', link: '/notes/system/btrfs-online-migration.md' },
      { text: '从 GRUB 切到 systemd-boot + UKI', link: '/notes/system/systemd-boot-uki.md' }
    ]
  },
  {
    text: '跨系统协作',
    items: [
      { text: 'Windows OpenSSH 服务器免密登录', link: '/notes/interop/windows-ssh-server-key-auth.md' },
      { text: 'Steam 识别已存在的本地游戏文件', link: '/notes/interop/steam-existing-files.md' }
    ]
  },
  {
    text: 'NixOS / Nix',
    items: [
      { text: 'Nix / NixOS 常用命令整理', link: '/notes/nix/nix-cli-guide.md' }
    ]
  }
]

export default defineConfig({
  title: 'Linux 生存手册',
  description: '一个普通 Linux 用户的长期笔记',
  lang: 'zh-CN',
  base: '/linux-docs/',
  head: [
    ['meta', { name: 'theme-color', content: '#0f8f7d' }],
    ['meta', { name: 'author', content: 'yuzujr' }],
    ['meta', { name: 'keywords', content: 'Linux, Arch, NixOS, Wayland, 运维, 教程' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Linux 生存手册' }],
    ['meta', { property: 'og:description', content: '移动端优先的 Linux 实战知识库，快速定位问题并给出可执行方案。' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '目录', link: '/notes/' },
      { text: 'Nix 专区', link: '/notes/nix/nix-cli-guide.md' },
      { text: 'GitHub', link: 'https://github.com/yuzujr/linux-docs' }
    ],
    search: {
      provider: 'local'
    },
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yuzujr/linux-docs' }
    ],
    footer: {
      message: 'Built with VitePress · HTTPS Enabled',
      copyright: 'Copyright © 2026 yuzujr'
    }
  },
  ignoreDeadLinks: true
})
