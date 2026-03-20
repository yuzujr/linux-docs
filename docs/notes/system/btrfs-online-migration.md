# Btrfs 在线迁移系统到新分区

这个场景很适合 Btrfs：

- 磁盘前面腾出了一大块未分配空间
- 原系统在磁盘尾部
- 旧 ESP 太小
- 不想进 LiveCD，也不想重启

## 1. 先规划新分区

用 GParted 之类的工具在磁盘前面新建：

1. 一个 `1024 MiB` 的 `fat32` 分区，准备用作新 ESP
2. 一个新的 `btrfs` 分区，吃掉剩下的空间

## 2. 在线把数据搬过去

系统还在运行时，直接做：

```bash
sudo btrfs device add -f /dev/nvme1n1p_NEW /
sudo btrfs device remove /dev/nvme1n1p_OLD /
```

`device remove` 开始之后，Btrfs 会在后台把数据从旧分区搬到新分区。

## 3. 清理旧分区并扩容

搬完以后：

1. 删除旧的 ESP 和旧的 Btrfs 分区
2. 把新的 Btrfs 分区拉伸到吃满剩余空间
3. 通知 Btrfs 认领新容量

```bash
sudo btrfs filesystem resize max /
```

## 4. 修 `fstab` 和挂载新的 ESP

```bash
sudo blkid /dev/nvme1n1p_NEW_ESP
```

拿到新的 UUID 之后：

1. 改 `/etc/fstab`
2. 把 `/efi` 的 UUID 替换成新值
3. 挂载新 ESP

```bash
sudo mount /dev/nvme1n1p_NEW_ESP /efi
```

最后再按你自己的引导方式修引导。
