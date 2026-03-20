---
layout: home
pageClass: home-curated
---

hero:
  name: "Linux 生存手册"
  text: "Arch / CachyOS / NixOS"
  tagline: 驱动 / 引导 / 桌面 / 网络 / NixOS
  actions:
    - theme: brand
      text: 目录
      link: /notes/
    - theme: alt
      text: NixOS
      link: /notes/nix-cli-guide.md

---

<div class="hero-meta">
  <span>问题导向</span>
  <span>长期维护</span>
  <span>少文字</span>
</div>

<div class="curated-grid">
  <section class="curated-block">
    <h2>开始</h2>
    <ul>
      <li><a href="/linux-docs/notes/">目录</a></li>
      <li><a href="/linux-docs/notes/preface.html">前言</a></li>
      <li><a href="/linux-docs/notes/nix-cli-guide.html">Nix / NixOS 常用命令整理</a></li>
    </ul>
  </section>

  <section class="curated-block">
    <h2>网络与连接</h2>
    <ul>
      <li><a href="/linux-docs/notes/network/jlu-drcom.html">吉林大学校园网认证：Drcom 与有线配置</a></li>
      <li><a href="/linux-docs/notes/network/proxy.html">Linux 代理工具：Clash Verge Rev / mihomo / metacubexd</a></li>
    </ul>
  </section>

  <section class="curated-block">
    <h2>显卡与图形</h2>
    <ul>
      <li><a href="/linux-docs/notes/graphics/nvidia-wayland.html">Nvidia 独显优先：Wayland 下的基础设置</a></li>
      <li><a href="/linux-docs/notes/graphics/linuxqq-egl.html">Linux QQ 在 Wayland 下花屏：强制切到 Nvidia EGL</a></li>
    </ul>
  </section>

  <section class="curated-block">
    <h2>桌面与交互</h2>
    <ul>
      <li><a href="/linux-docs/notes/desktop/keyring-conflict.html">自动登录环境下的 Keyring 冲突</a></li>
      <li><a href="/linux-docs/notes/desktop/remove-session-entries.html">登录界面只保留需要的桌面环境</a></li>
      <li><a href="/linux-docs/notes/desktop/kde-alt-tab.html">KDE 调成 Windows 风格 Alt+Tab</a></li>
      <li><a href="/linux-docs/notes/desktop/cursor.html">Linux 下鼠标指针主题与大小设置</a></li>
    </ul>
  </section>

  <section class="curated-block">
    <h2>系统、磁盘与引导</h2>
    <ul>
      <li><a href="/linux-docs/notes/system/btrfs-online-migration.html">Btrfs 在线迁移系统到新分区</a></li>
      <li><a href="/linux-docs/notes/system/systemd-boot-uki.html">从 GRUB 切到 systemd-boot + UKI</a></li>
    </ul>
  </section>

  <section class="curated-block">
    <h2>跨系统协作</h2>
    <ul>
      <li><a href="/linux-docs/notes/interop/windows-ssh-server-key-auth.html">Windows OpenSSH 服务器免密登录</a></li>
      <li><a href="/linux-docs/notes/interop/steam-existing-files.html">Steam 识别已存在的本地游戏文件</a></li>
    </ul>
  </section>

  <section class="curated-block">
    <h2>NixOS / Nix</h2>
    <ul>
      <li><a href="/linux-docs/notes/nix-cli-guide.html">Nix / NixOS 常用命令整理</a></li>
    </ul>
  </section>
</div>
