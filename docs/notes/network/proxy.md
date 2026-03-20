# Linux 代理工具：Clash Verge Rev / mihomo / metacubexd

如果只是想尽快把代理跑起来，直接装 [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) 就够了。

最省心的流程就是：

1. 装 Clash Verge Rev
2. 通过订阅链接导入配置
3. 开系统代理或者 TUN

## 想自己控规则怎么办

如果你不想把逻辑都交给 GUI，可以直接运行 `mihomo` 内核，自己维护：

- `proxy providers`
- `rule providers`
- 主配置文件

这样麻烦一些，但可控度高很多。

## Web UI

如果你喜欢用网页管理，可以配：

- [metacubexd](https://github.com/MetaCubeX/metacubexd)

我的建议很简单：

- 想快：`Clash Verge Rev`
- 想细控：`mihomo + metacubexd`
