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
      text: 前言
      link: /notes/preface.md
---
## 快速入口

<div class="note-grid">
  <a class="note-card" href="/linux-docs/notes/">
    <h3>目录</h3>
    <p>全部笔记。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/nix-cli-guide.html">
    <h3>NixOS / Nix</h3>
    <p>当前重点。</p>
  </a>
  <a class="note-card" href="/linux-docs/notes/preface.html">
    <h3>前言</h3>
    <p>当前状态。</p>
  </a>
</div>

## 笔记

<div class="home-panels">
  <section class="home-panel">
    <h3>网络与连接</h3>
    <ul>
      <li><a href="/linux-docs/notes/network/jlu-drcom.html">吉林大学校园网认证：Drcom 与有线配置</a></li>
      <li><a href="/linux-docs/notes/network/proxy.html">Linux 代理工具：Clash Verge Rev / mihomo / metacubexd</a></li>
    </ul>
  </section>
  <section class="home-panel">
    <h3>显卡与图形</h3>
    <ul>
      <li><a href="/linux-docs/notes/graphics/nvidia-wayland.html">Nvidia 独显优先：Wayland 下的基础设置</a></li>
      <li><a href="/linux-docs/notes/graphics/linuxqq-egl.html">Linux QQ 在 Wayland 下花屏：强制切到 Nvidia EGL</a></li>
    </ul>
  </section>
  <section class="home-panel">
    <h3>桌面与交互</h3>
    <ul>
      <li><a href="/linux-docs/notes/desktop/keyring-conflict.html">自动登录环境下的 Keyring 冲突</a></li>
      <li><a href="/linux-docs/notes/desktop/remove-session-entries.html">登录界面只保留需要的桌面环境</a></li>
      <li><a href="/linux-docs/notes/desktop/kde-alt-tab.html">KDE 调成 Windows 风格 Alt+Tab</a></li>
      <li><a href="/linux-docs/notes/desktop/cursor.html">Linux 下鼠标指针主题与大小设置</a></li>
    </ul>
  </section>
  <section class="home-panel">
    <h3>系统、磁盘与引导</h3>
    <ul>
      <li><a href="/linux-docs/notes/system/btrfs-online-migration.html">Btrfs 在线迁移系统到新分区</a></li>
      <li><a href="/linux-docs/notes/system/systemd-boot-uki.html">从 GRUB 切到 systemd-boot + UKI</a></li>
    </ul>
  </section>
  <section class="home-panel">
    <h3>跨系统协作</h3>
    <ul>
      <li><a href="/linux-docs/notes/interop/windows-ssh-server-key-auth.html">Windows OpenSSH 服务器免密登录</a></li>
      <li><a href="/linux-docs/notes/interop/steam-existing-files.html">Steam 识别已存在的本地游戏文件</a></li>
    </ul>
  </section>
  <section class="home-panel">
    <h3>NixOS / Nix</h3>
    <ul>
      <li><a href="/linux-docs/notes/nix-cli-guide.html">Nix / NixOS 常用命令整理</a></li>
    </ul>
  </section>
</div>
