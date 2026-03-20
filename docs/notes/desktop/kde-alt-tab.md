# KDE 调成 Windows 风格 Alt+Tab

KDE 默认的任务切换器不一定难用，但如果你已经习惯 Windows 那套节奏，最难受的通常是两件事：

- 有延迟
- 样式不对

## 1. 把延迟去掉

```bash
kwriteconfig5 --file ~/.config/kwinrc --group TabBox --key DelayTime 0
qdbus org.kde.KWin /KWin reconfigure
```

## 2. 改任务切换器样式

在 KDE 设置里打开：

- 设置
- 窗口管理
- 任务切换器

然后：

- 取消勾选“显示选中窗口”
- 下载并启用 `Aqua Medium Icons`

这样手感会更接近很多人熟悉的 Windows 风格。
