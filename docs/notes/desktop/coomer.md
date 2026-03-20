# coomer：Linux 下很好用的屏幕放大镜

![coomer 演示](/assets/coomer-demo.gif)

[coomer](https://github.com/yuzujr/coomer) 是我自己写的一个 Linux 屏幕放大镜工具。

如果你经常做演示、录屏、远程协助，或者只是觉得某些 UI 字太小，`coomer` 是我现在最常用的放大工具之一。

它是一个 Linux 原生 zoomer，交互简单，启动快，而且对 X11 / Wayland 都有可用路径。

## 我为什么推荐它

- 多后端自动选择：`wlr-screencopy` / `portal` / `x11`
- 多显示器可选（X11/wlr）：可以指定某个显示器，或者 `all`
- 交互很直接：滚轮缩放、左键拖拽、右键退出
- Wayland 下还支持 overlay 模式（按场景可用）

## 适合的场景

- 讲解代码时临时放大局部
- 录屏时突出某个按钮或日志区域
- 高分屏下快速看清旧应用的小字号界面

## 安装

### Arch Linux (AUR)

```bash
paru -S coomer-bin
# 或
yay -S coomer-bin
```

### NixOS / Nix

NixOS 持久安装（flake）：

`flake.nix` 添加输入：

```nix
inputs.coomer.url = "github:yuzujr/coomer";
```

在 NixOS 配置里加入：

```nix
environment.systemPackages = [
  inputs.coomer.packages.${pkgs.system}.default
];
```

更新系统：

```bash
sudo nixos-rebuild switch --flake .
```

先试跑（不安装）：

```bash
nix run github:yuzujr/coomer
```

## 常用启动方式

```bash
# 默认自动后端
coomer

# 指定 wlr 后端
coomer --backend wlr

# 指定显示器（先用 --list-monitors 查看名字）
coomer --backend wlr --list-monitors
coomer --backend wlr --monitor eDP-1

# Wayland portal 交互选择
coomer --backend portal --portal-interactive
```

## 快捷键（默认）

- `Q` / `A` / 右键：退出
- 按住左键拖动：平移
- 滚轮：缩放
- 按住 `Ctrl`：spotlight（`Ctrl + 滚轮` 调整 spotlight 大小）

## 一个实用提醒

在 Wayland 多显示器场景下，`portal` 后端通常偏向全屏捕获。  
如果你只想选定区域或某个窗口，建议使用 `--portal-interactive`，每次启动手动选取。
