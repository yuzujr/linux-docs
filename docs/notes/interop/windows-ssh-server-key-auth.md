# Windows OpenSSH 服务器免密登录

这个坑很典型：前面的公钥配置明明都按 Linux 那套做完了，但连 Windows 的 OpenSSH 服务器时还是继续要密码。

## 原因

Windows 的 OpenSSH 默认会对管理员组走另一套 `AuthorizedKeysFile` 路径。

## 解决方法

打开：

```text
C:\ProgramData\ssh\sshd_config
```

把下面两行注释掉：

```text
Match Group administrators
       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

然后去 Windows 的“服务”里重启：

- `OpenSSH SSH Server`

做完这一步，免密登录基本就正常了。
