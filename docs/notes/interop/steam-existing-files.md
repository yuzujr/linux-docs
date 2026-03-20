# Steam 识别已存在的本地游戏文件

如果你是 Windows + Linux 双系统，这条很实用：没必要在两个系统里把同一个游戏反复下一遍。

Steam 要识别现成文件，顺序不能乱：

1. 先在 Steam 里点安装，让它把目录结构建出来
2. 把已有游戏文件复制进去，一般是 `Steam/steamapps/common/游戏名`
3. 回 Steam 点卸载
4. 再次点安装，Steam 就会改成校验已有文件

Linux 下 Steam 目录一般在：

```text
~/.local/share/Steam
```

看起来有点绕，但这是最稳的一套。
