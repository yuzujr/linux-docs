# 自动登录环境下的 Keyring 冲突

这个问题一般出现在下面这种组合里：

- `greetd` 自动登录
- KDE 和 niri 混着用
- 浏览器一启动就弹 Keyring / KWallet
- 换桌面环境以后，Cookie 或登录状态又没了

## 问题本质

不是浏览器坏了，而是密码存储后端在不同桌面环境之间来回切。

- KDE 通常走 `kwallet`
- GNOME / niri 这边更常见的是 `gnome-keyring`

如果你是自动登录、单用户、物理环境也相对安全的机器，最省事的做法不是继续调它们的兼容性，而是直接让浏览器别依赖系统 Keyring。

## 解决方法

在 `~/.config/chrome-flags.conf` 追加：

```text
--password-store=basic
```

这样浏览器会改用自己的基础存储方式，不再来回碰系统 Keyring。

## 额外一步：去掉弹窗

- KDE 用 `kwalletmanager`
- GNOME 体系用 `seahorse`

把原有密钥环密码清空，弹窗基本也就跟着消失了。
