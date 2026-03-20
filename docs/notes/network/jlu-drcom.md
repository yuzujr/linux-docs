# 吉林大学校园网认证：Drcom 与有线配置

在吉林大学这套环境里，最省事的做法还是直接用 Drcom 客户端。

```bash
git clone https://github.com/AndrewLawrence80/jlu-drcom-client
cd jlu-drcom-client
# 修改 config.h 里的账号、密码和网卡信息
make
./drclient_jlu
```

如果你不想继续维护原版，也可以直接用我写的跨平台版本：

- [drcom-client-cpp](https://github.com/yuzujr/drcom-client-cpp)

## 有线连接怎么配

光跑客户端还不够，有线连接本身也要先配对。

可以用 `nmcli`，也可以直接用桌面环境自带的图形界面。关键字段是下面两个：

- `克隆 MAC 地址`：填校园网账号绑定的物理地址
- `IPv4`：改成手动，补上 `DNS`、`IP 地址`、`子网掩码` 和 `网关`

改完以后把有线连接重新断开再连，再跑一次 `drclient_jlu`。
