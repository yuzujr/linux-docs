# 从 GRUB 切到 systemd-boot + UKI

如果你已经受够了 GRUB 那堆配置和 `/boot` 里散着的一大堆文件，`systemd-boot + UKI` 是一条很干净的路。

UKI 的思路很简单：把内核、微代码和 initramfs 收成一个 `.efi` 文件。

## 1. 先把启动参数单独存出来

```bash
cat /proc/cmdline
sudo mkdir -p /etc/kernel
sudo nano /etc/kernel/cmdline
```

把真正有用的那部分参数留下，像 `BOOT_IMAGE=` 和 `initrd=` 这种不用抄。

## 2. 配 `mkinitcpio` 直接产出 UKI

以 `/etc/mkinitcpio.d/linux-zen.preset` 为例：

```ini
ALL_config="/etc/mkinitcpio.conf"
ALL_kver="/boot/vmlinuz-linux-zen"
PRESETS=('default' 'fallback')

#default_image="/boot/initramfs-linux-zen.img"
default_uki="/efi/EFI/Linux/arch-linux-zen.efi"

#fallback_image="/boot/initramfs-linux-zen-fallback.img"
fallback_uki="/efi/EFI/Linux/arch-linux-zen-fallback.efi"
fallback_options="-S autodetect"
```

## 3. 重新生成

```bash
sudo mkinitcpio -P
```

这里有个很容易踩的坑：

`/boot` 里的 `vmlinuz-linux-*` 和 `*-ucode.img` 不是垃圾，它们是打包 UKI 时要吃进去的原材料。不要为了看着整洁把它们删了。

如果你已经手滑删掉，最直接的补救办法通常是重装对应内核包。

## 4. 装 `systemd-boot`

```bash
sudo bootctl --path=/efi install
```

然后写 `/efi/loader/loader.conf`：

```ini
default arch-linux-*.efi
timeout 3
editor yes
```

## 5. 把 Windows 的引导项搬过来

```bash
sudo mount /dev/nvme1n1p1 /mnt
sudo cp -a /mnt/EFI/Microsoft /efi/EFI/
sudo umount /mnt
```

最后重启，确认一切正常之后，再去清理旧的 GRUB 残留。
