---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Linux 生存手册"
  text: "把系统折腾坏，再把它修回来"
  tagline: 从 Arch、CachyOS 到 NixOS。这里写驱动、引导、桌面环境、网络，还有那些重装后还会再遇到的问题。
  actions:
    - theme: brand
      text: 从这里开始
      link: /notes/
    - theme: alt
      text: 写在前面
      link: /notes/preface.md
    - theme: alt
      text: NixOS 笔记
      link: /notes/nix/

features:
  - title: 写在前面
    details: 先看这一页，知道这个站为什么会从几篇杂记，慢慢长成一套手册。
    link: /notes/preface.md
  - title: 目录
    details: 现在的内容已经按问题拆开，按分类收好，不用再在长文里翻来翻去。
    link: /notes/
  - title: NixOS / Nix
    details: 最近的重心在这里，先把最常用、最容易混的命令和工作流写清楚。
    link: /notes/nix/
---

<div class="home-copy">
  <p>这不是教程站，更像一个人长期维护的抽屉柜。里面放的是装坏过、修回来过、以后八成还会再查一次的东西。</p>
  <p>以前我习惯把所有东西塞进几篇长文里。后来发现这样写痛快，查起来很痛苦。现在就按问题拆开，按类别摆好。</p>
</div>

## 从这里开始

<div class="note-grid">
  <a class="note-card" href="/linux-docs/notes/preface.html">
    <h3>写在前面</h3>
    <p>几个月的发行版迁移，为什么最后落到 NixOS，以及这个站接下来想怎么写。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/">
    <h3>目录</h3>
    <p>新的入口页。按网络、图形、桌面、系统、跨系统协作、NixOS 分好类。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/nix/">
    <h3>NixOS / Nix</h3>
    <p>现在的主力系统在这边，相关笔记会越来越多，也会越写越细。</p>
  </a>
</div>

## 现在这套目录

<div class="note-grid">
  <a class="note-card" href="/linux-docs/notes/network/">
    <h3>网络与连接</h3>
    <p>校园网、代理，以及那些一上来就会挡住你干活的东西。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/graphics/">
    <h3>显卡与图形</h3>
    <p>Nvidia、Wayland、EGL，和所有一眼看上去像玄学的问题。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/desktop/">
    <h3>桌面与交互</h3>
    <p>登录器、Keyring、Alt+Tab、鼠标指针，这些每天都会碰到的小地方。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/system/">
    <h3>系统、磁盘与引导</h3>
    <p>Btrfs、systemd-boot、UKI。真正容易把系统搞挂的东西都放这里。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/interop/">
    <h3>跨系统协作</h3>
    <p>Windows 和 Linux 混用时的一些麻烦事，比如 SSH 和 Steam。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/nix/">
    <h3>NixOS / Nix</h3>
    <p>最近的新重心。先把工具和工作流写稳，再慢慢补配置细节。</p>
  </a>
</div>
