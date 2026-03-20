# Linux QQ 在 Wayland 下花屏：强制切到 Nvidia EGL

症状一般长这样：

- QQ 原生 Wayland 启动
- 已经配过独显优先
- 但界面还是出现马赛克、撕裂或者明显异常

这个问题在 Nvidia 机器上很容易误判成“桌面环境没配好”，其实根子通常不在桌面环境。

## 原因

`libglvnd` 在选 `EGL` 供应者时，可能选到了 `mesa`，结果 QQ 实际走的是核显。

如果桌面环境本身已经在用独显渲染，这时就会出现大量跨卡数据拷贝。核显一旦顶不住，花屏和撕裂就都出来了。

## 解决方法

启动 QQ 时手动指定 Nvidia 的 EGL：

```bash
env __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/10_nvidia.json linuxqq
```

如果你经常用 QQ，最省事的做法是给它单独写一个启动器或者桌面项，不要每次手敲。
