# Linux 下鼠标指针主题与大小设置

鼠标指针在 Linux 上一直不是“一处修改，到处生效”的东西。不同桌面、不同协议、不同工具链，经常各走各的。

## X11 传统方式

改 `/usr/share/icons/default/index.theme`，可以指定默认主题。

另外还可以在 `~/.Xresources` 里补：

```text
Xcursor.theme: default
Xcursor.size: 24
```

## GNOME

如果只是想改大小：

```bash
gsettings set org.gnome.desktop.interface cursor-size 24
```

如果你发现某些程序和系统设置不同步，通常不是你改错了，而是它们读的配置源不一样。
