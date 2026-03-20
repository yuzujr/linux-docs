---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Linux 生存手册"
  text: "问题导向的 Linux 笔记"
  tagline: Arch / CachyOS / NixOS。驱动、引导、桌面、网络、NixOS。
  actions:
    - theme: brand
      text: 目录
      link: /notes/
    - theme: alt
      text: NixOS
      link: /notes/nix/
    - theme: alt
      text: 前言
      link: /notes/preface.md

features:
  - title: 目录
    details: 按问题分类。
    link: /notes/
  - title: NixOS / Nix
    details: 当前重点。
    link: /notes/nix/
  - title: 归档
    details: 长文与旧记录。
    link: /notes/linux-survival-guide.md
---
## 入口

<div class="note-grid">
  <a class="note-card" href="/linux-docs/notes/">
    <h3>目录</h3>
    <p>按问题分类。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/nix/">
    <h3>NixOS / Nix</h3>
    <p>当前重点。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/preface.html">
    <h3>前言</h3>
    <p>当前状态与结构说明。</p>
  </a>
</div>

## 分类

<div class="note-grid">
  <a class="note-card" href="/linux-docs/notes/network/">
    <h3>网络与连接</h3>
    <p>校园网、代理。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/graphics/">
    <h3>显卡与图形</h3>
    <p>Nvidia、Wayland、EGL。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/desktop/">
    <h3>桌面与交互</h3>
    <p>登录器、Keyring、Alt+Tab。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/system/">
    <h3>系统、磁盘与引导</h3>
    <p>Btrfs、boot、UKI。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/interop/">
    <h3>跨系统协作</h3>
    <p>Windows、SSH、Steam。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/nix/">
    <h3>NixOS / Nix</h3>
    <p>命令、工作流、配置。</p>
  </a>
</div>
