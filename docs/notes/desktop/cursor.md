# Linux 下鼠标指针主题与大小设置

鼠标指针在 Linux 上一直不是“一处修改，到处生效”的东西。不同桌面、不同协议、不同工具链，经常各走各的。

本文分两类：
1. 你已有 Linux 光标主题，只想切换主题/调整大小。
2. 你拿到的是 Windows `.ani/.cur` 主题，先转换成 Linux 可用格式再启用。

## 只改已有主题（不转换）

### GNOME / GTK

设置主题：

```bash
gsettings set org.gnome.desktop.interface cursor-theme 'ThemeName'
```

设置大小：

```bash
gsettings set org.gnome.desktop.interface cursor-size 24
```

### KDE Plasma

```bash
plasma-apply-cursortheme ThemeName
```

### Hyprland

在 `~/.config/hypr/hyprland.conf`：

```ini
exec = hyprctl setcursor ThemeName 24
```

### Sway

在 `~/.config/sway/config`：

```text
seat * xcursor_theme ThemeName 24
```

### Niri

在 `~/.config/niri/config.kdl`：

```text
cursor {
    xcursor-theme "ThemeName"
}
```

### X11 传统方式

`~/.Xresources`：

```text
Xcursor.theme: ThemeName
Xcursor.size: 24
```

然后加载：

```bash
xrdb -merge ~/.Xresources
```

## 把 Windows `.ani/.cur` 转成 Linux 主题（ani2xcursor）

我的项目：[ani2xcursor](https://github.com/yuzujr/ani2xcursor)（支持 `.ani/.cur`，可多尺寸导出，可生成 manifest 修映射）

### 安装

Arch（AUR）：

```bash
paru -S ani2xcursor-bin
# 或
yay -S ani2xcursor-bin
```

NixOS（直接试跑）：

```bash
nix run github:yuzujr/ani2xcursor -- /path/to/cursor/folder
```

### 基础转换

```bash
ani2xcursor /path/to/cursor/folder
```

常用参数：

```text
--install            安装到 $XDG_DATA_HOME/icons
--size 24,32         目标尺寸，不足时自动缩放补齐
--list               先看源文件可用尺寸
--manifest           生成预览 + manifest.toml 供手工修映射
--skip-broken        跳过损坏光标继续处理
```

### Manifest 模式（推荐）

先生成模板与预览：

```bash
ani2xcursor /path/to/cursor/folder --manifest
```

会在输入目录下生成：

```text
ani2xcursor/
├── manifest.toml
└── previews/
```

编辑 `manifest.toml` 后再次运行转换命令。若存在 `manifest.toml`，会优先使用它（并覆盖 `--size`）。

## 解决“系统改了，但部分程序不跟随”

这通常不是改错，而是不同程序读取了不同配置源。

### libXcursor fallback（很关键）

有些 X11/XWayland 程序会回退读取名为 `default` 的主题。建议建一个用户级别 fallback：

`~/.icons/default/index.theme`

```ini
[Icon Theme]
Inherits=ThemeName
```

系统级可用 `/usr/share/icons/default/index.theme`。  
`Inherits` 里只会使用第一个主题名。

### 最后一步

修改后建议重新登录图形会话，或至少重启目标程序，避免旧配置缓存。
