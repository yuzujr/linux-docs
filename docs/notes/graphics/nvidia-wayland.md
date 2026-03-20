# Nvidia 独显优先：Wayland 下的基础设置

先装好驱动包：

- `nvidia`
- `nvidia-settings`
- `nvidia-utils`

如果你用的是 50 系显卡，这里的内核模块一般应该换成 `nvidia-open`。

## 1. 打开 `nvidia_drm.modeset=1`

改 `/etc/default/grub`：

```text
GRUB_CMDLINE_LINUX_DEFAULT="nvidia_drm.modeset=1"
```

不是整行替换，只是把 `nvidia_drm.modeset=1` 加进原有参数里。

## 2. 让桌面环境优先用独显

先确认显卡对应的设备：

1. `lspci | grep -E "VGA"` 找到独显的 PCI 地址，比如 `01:00.0`
2. `ls -l /dev/dri/by-path/` 找到它对应的 `cardX` 和 `renderDXXX`

### KDE

创建 `~/.config/plasma-workspace/env/kwin-drm.sh`：

```bash
#!/bin/bash
export KWIN_DRM_DEVICES="/dev/dri/card0:/dev/dri/card1"
```

### Hyprland

在 Hyprland 或 uwsm 配置里加：

```bash
export AQ_DRM_DEVICES="/dev/dri/card0:/dev/dri/card1"
```

### Niri

在 `~/.config/niri/config.kdl` 之类的配置文件里加：

```text
debug {
    render-drm-device "/dev/dri/renderD128"
    ignore-drm-device "/dev/dri/renderD129"
}
```

`ignore-drm-device` 不是必填。它会直接禁掉对应显卡，用错了可能导致内屏或者外接屏点不亮。

## 3. 验证模块是否正常

```bash
lsmod | grep nvidia
```

正常情况下能看到 `nvidia_drm` 之类的模块。

## 4. 如果功耗上不去

看一下 `nvidia-smi`。如果显卡的最大功率明显低于预期，可以开：

```bash
sudo systemctl enable --now nvidia-powerd.service
```

然后再看一次 `nvidia-smi`。
