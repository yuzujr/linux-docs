# 写在前面：从 Arch 折腾到 NixOS

这个站最早只是拿来记命令和坑点的。用久了才发现，真正会留下来的不是“今天装了什么”，而是那些把系统折腾坏之后又一点点修回来的过程。

过去几个月，我在发行版之间来回跑了好几趟：

- Arch Linux
- CachyOS
- 回到 Arch Linux
- 现在是 NixOS

重装、迁移、换桌面环境、修引导、调显卡、救网络，很多事情都不止做过一遍。折腾多了以后，人会慢慢变得现实一点，不再追求“最酷的桌面截图”，而是更在意一台机器能不能稳定地被重新搭起来。

<div class="shot-grid">
  <figure class="shot-card">
    <img src="../assets/fastfetch-arch.png" alt="Arch fastfetch" />
    <figcaption>Arch</figcaption>
  </figure>
  <figure class="shot-card">
    <img src="../assets/fastfetch-cachyos.png" alt="CachyOS fastfetch" />
    <figcaption>CachyOS</figcaption>
  </figure>
  <figure class="shot-card">
    <img src="../assets/fastfetch-nixos.png" alt="NixOS fastfetch" />
    <figcaption>NixOS</figcaption>
  </figure>
</div>

## 为什么最后落到 NixOS

不是因为它更神，也不是因为它更难。

只是前面折腾到后来，我越来越想把这些东西收起来：

- 系统到底装了什么
- 为什么要这样配
- 改坏以后怎么退回去
- 重装以后怎样最快恢复

Arch 和 CachyOS 让我学会了不少硬碰硬的东西。NixOS 则更像是把这些经验装进文件里。它不一定更省时间，但更少靠记忆。

## 这个站现在怎么读

如果你是第一次打开这里，最好的顺序不是从头翻到尾，而是按分类进：

1. 先看 [目录](/notes/)
2. 碰到什么问题，就进对应那一栏
3. 想看我最近在折腾什么，再回来看 [NixOS / Nix](/notes/nix/)

我把原来那几篇很长的文章拆掉了。现在每个问题一篇，目录也重新分过类，查起来应该顺手很多。
