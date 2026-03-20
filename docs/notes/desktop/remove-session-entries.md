# 登录界面只保留需要的桌面环境

多装几个桌面环境或者 Wayland compositor 之后，登录界面的会话列表很容易变得又长又乱。

最直接的做法就是把不需要的 `.desktop` 文件删掉或者改名。

相关目录一般是：

- `/usr/share/xsessions/`
- `/usr/share/wayland-sessions/`

如果你只是想临时隐藏，改名比删除更稳一点。
