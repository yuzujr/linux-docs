# Arch Linux 进阶折腾与优化实录

> 记录从 CachyOS 迁移到原生 Arch Linux 过程中遇到的各类“疑难杂症”，以及如何利用现代化工具（Wayland, Btrfs, systemd-boot, UKI）打造一个优雅、干净、极速的系统环境。

---

## 目录
1. [桌面体验优化：Wayland 缩放、字体发虚与 Keyring 冲突](#1-桌面体验优化wayland-缩放字体发虚与-keyring-冲突)
2. [存储黑科技：Btrfs 无损在线热迁移与扩容](#2-存储黑科技btrfs-无损在线热迁移与扩容)
3. [现代化引导：拥抱 systemd-boot 与 UKI (统一内核镜像)](#3-现代化引导拥抱-systemd-boot-与-uki)

---

## 1. 桌面体验优化：Wayland 缩放、字体发虚与 Keyring 冲突

**问题场景**：

* 使用 `greetd` 自动登录后，每次打开浏览器都会弹出巨大的 Keyring (密钥环) 解锁要求。
* KDE (`kwallet`) 和 niri (`gnome-keyring`) 冲突，导致跨桌面环境时浏览器登录状态（Cookie）全部丢失。

**终极解决方案**：

### 1.1 解决跨桌面环境的 Keyring 冲突
针对自动登录的单用户安全环境，最省心的方式是彻底接管浏览器的密码存储后端，不依赖系统 DE 的服务，从而实现跨桌面环境的 Cookie 无缝共享。
在`~/.config/chrome-flags.conf` 中追加：

```text
# 彻底禁用系统 Keyring 依赖，使用基础本地文本加密（适合自动登录且物理安全的电脑）
--password-store=basic
```

### 1.2 去除密码弹窗

kde使用`kwalletmanager`，gnome使用`seahorse`，把密钥改成空就可以了。

---

## 2. 存储黑科技：Btrfs 无损在线热迁移与扩容

**问题场景**：
格式化了硬盘最前方的双系统旧分区，留下了 400GB+ 的未分配空间。系统处于硬盘尾部，且旧的 ESP 分区太小（95MB）。在**不重启、不使用 LiveCD** 的情况下，如何将系统迁移到最前面并占满整盘？

**利用 Btrfs 的 `device add/remove` 魔法**：

### 2.1 规划新分区 (使用 GParted)
在磁盘最前方的未分配空间中：
1. 新建 `1024 MiB` 的 `fat32` 分区（新 ESP，未来的 `/efi`）。
2. 将剩余空间全部划分为新的 `btrfs` 分区。

### 2.2 在线数据大挪移
打开终端，在系统仍在运行的情况下执行：
```bash
# 1. 将新 Btrfs 分区加入当前根目录
sudo btrfs device add -f /dev/nvme1n1p_NEW /

# 2. 移除旧 Btrfs 分区（此时系统会后台全速转移所有数据至新分区）
sudo btrfs device remove /dev/nvme1n1p_OLD /
```

### 2.3 扩容与清理旧分区
1. 转移完成后，在 GParted 中删除旧的 ESP 和旧的 Btrfs 分区。
2. 将新的 Btrfs 分区向右侧拉伸至占满所有空闲空间。
3. 终端通知 Btrfs 认领新空间：
   ```bash
   sudo btrfs filesystem resize max /
   ```

### 2.4 修复 fstab 并挂载新 ESP
1. 获取新 ESP 空间的 UUID：`sudo blkid /dev/nvme1n1p_NEW_ESP`
2. 编辑 `/etc/fstab`，将 `/efi` 挂载点的 UUID 替换为新值。
3. 挂载它：`sudo mount /dev/nvme1n1p_NEW_ESP /efi`
4. 修复引导，使用`grub`或`systemd-boot`方式不同

---

## 3. 现代化引导：拥抱 systemd-boot 与 UKI

**问题场景**：
`/boot` 目录文件散乱，GRUB 配置文件极其复杂。希望使用更现代、极简的 `systemd-boot`，并结合 UKI（统一内核镜像）将内核、微代码和 initramfs 打包成一个 `.efi` 文件。

### 3.1 提取内核启动参数
提取当前系统的启动参数（剔除掉 `BOOT_IMAGE` 和 `initrd` 部分）：
```bash
# 获取类似 root=UUID=... rw rootflags=subvol=/@ quiet 的字符串
cat /proc/cmdline

# 保存为 UKI 专用的 cmdline 文件
sudo mkdir -p /etc/kernel
sudo nano /etc/kernel/cmdline
```

### 3.2 配置 mkinitcpio 生成 UKI
编辑内核预设文件，例如 `/etc/mkinitcpio.d/linux-zen.preset`：
```ini
ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-linux-zen"
PRESETS=('default' 'fallback')

# 注释掉旧的 .img 模式，启用 .efi 模式
#default_image="/boot/initramfs-linux-zen.img"
default_uki="/efi/EFI/Linux/arch-linux-zen.efi"

#fallback_image="/boot/initramfs-linux-zen-fallback.img"
fallback_uki="/efi/EFI/Linux/arch-linux-zen-fallback.efi"
fallback_options="-S autodetect"
```

### 3.3 重新生成镜像并清理
生成 UKI 镜像到 ESP 分区：
```bash
sudo mkinitcpio -P
```

**⚠️ 踩坑警告：不要删掉“原材料仓库”！**
`/boot` 目录中的 `vmlinuz-linux-*` (内核本体) 和 `*-ucode.img` (微代码) 是 `mkinitcpio` 每次打包需要的**原材料**，**绝对不能删除**！
如果误删会导致 `ERROR: Invalid option -k -- '/boot/vmlinuz-linux-zen' must be readable`。抢救方法是重新 `sudo pacman -S linux-zen`。
你唯一可以删除的“垃圾”是旧版散装生成的 `initramfs-*.img`。

### 3.4 安装 systemd-boot 并配置
```bash
# 安装引导管理器
sudo bootctl --path=/efi install
```
编辑 `systemd-boot` 全局配置 `/efi/loader/loader.conf`：
```ini
default arch-linux-*.efi
timeout 3
editor yes
```

### 3.5 Windows引导

只需要把Windows的EFI搬过来即可，位置可查看`lsblk`

```bash
sudo mount /dev/nvme1n1p1（Windows EFI分区） /mnt
sudo cp -a /mnt/EFI/Microsoft /efi/EFI/
sudo umount /mnt
```

重启系统，见证极速、极简的现代化 Linux 启动体验。卸载旧的 `grub` 包并删除残留的 `/efi/EFI/GRUB` 目录，大功告成！
