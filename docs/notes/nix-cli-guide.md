# Nix / NixOS 常用命令整理

适用背景：

- 你在用现代 NixOS
- 你主要接触的是 flakes 工作流

这份文档的目标不是把所有命令都讲完，而是把真正常用、容易混淆、值得先学会的命令讲清楚。

## 先记住一件事

Nix 世界里的命令其实分成 3 代：

- 旧时代命令：`nix-env`、`nix-shell`、`nix-build`、`nix-channel`
- 新版统一命令：`nix build`、`nix run`、`nix shell`、`nix develop`、`nix profile`、`nix flake`
- NixOS / 生态封装：`nixos-rebuild`、`home-manager`、`nh`

很多教程让人困惑，就是因为把这 3 代命令混在一起讲了。

如果你是现代 NixOS + flakes 用户，优先学习：

- `nix ...` 新版命令
- `nixos-rebuild`
- `home-manager`
- `nh`

把旧命令当成“历史兼容层”就够了。

## 5 个核心概念

### 1. `flake.nix`

一个项目的入口文件。你可以把它理解成：

“这个仓库能提供哪些输出？”

常见输出有：

- `packages`
- `apps`
- `devShells`
- `nixosConfigurations`
- `homeConfigurations`

### 2. `flake.lock`

依赖版本锁文件。它让你今天和下周构建出来的结果尽量一致。

### 3. `/nix/store`

Nix 所有构建产物最终都放在这里。它的特点是：

- 内容不可变
- 同样内容不会重复构建
- 系统、包、shell、工具最终都会落到这里

### 4. `profile`

可以理解成一组“已安装包”的快照。

比如你用 `nix profile install` 装的东西，就会进 profile。

### 5. `generation`

每次系统切换、Home Manager 切换、profile 变化，通常都会留下历史版本。

好处是：

- 可以回滚
- 可以清理旧版本

## 最重要的判断题

你只要先学会下面这套判断，就已经能避免 80% 的混乱：

- 我要开发项目：`nix develop`
- 我要临时拿一个工具：`nix shell`
- 我要直接运行一个程序：`nix run`
- 我要构建产物：`nix build`
- 我要更新 flake 依赖：`nix flake update`
- 我要切系统配置：`nixos-rebuild switch` 或 `nh os switch`
- 我要清理垃圾：`nix-collect-garbage -d`

## 日常最常用命令

### `nix develop`

作用：

进入开发环境。

什么时候用：

- 你要开发某个项目
- 你需要编译器、头文件、环境变量、工具链都准备好

理解方式：

它不是“临时装个工具”，而是“进入这个项目定义好的开发环境”。

例子：

```bash
nix develop
nix develop .#default
nix develop github:user/repo
```

### `nix shell`

作用：

临时把一个或多个包放到当前 shell 里。

什么时候用：

- 你只想临时用一下 `jq`、`ripgrep`、`fd`、`gcc`
- 你不需要完整开发环境

理解方式：

更像“临时把东西加到 PATH 里”。

例子：

```bash
nix shell nixpkgs#jq
nix shell nixpkgs#ripgrep nixpkgs#fd
```

### `nix run`

作用：

直接运行一个程序。

什么时候用：

- 你不想先进 shell
- 你只想把某个 app 跑起来

例子：

```bash
nix run nixpkgs#hello
nix run github:user/repo
```

### `nix build`

作用：

构建产物，但不帮你运行。

什么时候用：

- 你想得到构建结果
- 你想看一个包能不能成功构建
- 你想生成 `result` 链接

例子：

```bash
nix build
nix build .#my-package
ls -l result
```

理解方式：

`nix run` 偏“运行”，`nix build` 偏“产出结果”。

### `nix search`

作用：

搜索包。

例子：

```bash
nix search nixpkgs ripgrep
```

### `nix flake show`

作用：

查看一个 flake 暴露了哪些输出。

这条命令非常值钱，因为很多时候你根本不知道这个 flake 里到底有：

- `packages`
- `apps`
- `devShells`
- `nixosConfigurations`

例子：

```bash
nix flake show
nix flake show github:user/repo
```

### `nix flake update`

作用：

更新 `flake.lock`。

理解方式：

这是 flakes 工作流里“升级依赖版本”的核心命令。

例子：

```bash
nix flake update
nix flake lock --update-input nixpkgs
```

## 系统层命令

### `nixos-rebuild`

这是 NixOS 最核心的系统命令。

它的本质是：

- 根据你的 NixOS 配置构建新系统
- 把新系统放进 `/nix/store`
- 需要的话切换到新系统
- 留下可回滚的 generation

最重要的几个子命令：

- `nixos-rebuild switch`
  立即切过去，并设成下次启动默认
- `nixos-rebuild test`
  立即切过去，但不设成默认
- `nixos-rebuild boot`
  只给下次启动用，现在不切
- `nixos-rebuild build`
  只构建，不切换

常见例子：

```bash
sudo nixos-rebuild switch --flake .
sudo nixos-rebuild test --flake .
sudo nixos-rebuild boot --flake .
```

最实用的理解：

- `switch`：现在就用，以后也用
- `test`：现在先试试，重启就回去
- `boot`：以后再用，现在别动

## `nh` 是什么

`nh` 不是官方 Nix CLI，但非常实用。

它是一个围绕下面这些流程做的便捷包装：

- `nixos-rebuild`
- Home Manager
- 清理 generation / 垃圾
- 搜索包

你已经在用它，这没问题。

### 常见 `nh` 用法

- `nh os switch`
  更顺手的系统切换
- `nh os test`
  测试系统配置
- `nh os boot`
  只更新下次启动配置
- `nh clean all`
  做更完整的清理
- `nh search`
  搜索包

如果你的 `nhs` 是 alias 到 `nh os switch`，那它本质上就是“切系统”的快捷方式。

## 用户层命令

### `home-manager switch`

作用：

应用用户级配置。

适合管这些东西：

- shell 配置
- 编辑器配置
- git 配置
- dotfiles
- 用户级 package

理解方式：

`nixos-rebuild` 管系统，`home-manager switch` 管用户环境。

### `nix profile`

作用：

管理当前用户的 profile。

常见命令：

- `nix profile install nixpkgs#foo`
- `nix profile remove foo`
- `nix profile list`

它的定位是：

“命令式安装，但仍然在 Nix 体系内。”

### 我该不该用 `nix profile install`？

可以用，但别把它当主工作流。

更好的判断方式：

- 想长期稳定存在的包：放进 NixOS 配置或 Home Manager
- 想按项目隔离：放进 flake / devShell
- 想临时用一下：`nix shell` 或 `nix run`
- 想临时先装着：`nix profile install`

经验上：

`nix profile install` 用多了，后面会忘记“这个包到底是系统装的，Home Manager 装的，还是 profile 装的”。

## 排错和观察命令

### `nix eval`

作用：

只求值，不构建。

适合：

- 看一个表达式最后算出来是什么
- 看 flake 某个输出的值

例子：

```bash
nix eval .#packages.x86_64-linux.default.meta.description
```

### `nix repl`

作用：

交互式试 Nix 表达式。

适合：

- 学表达式语言
- 交互式探索 flake 输出

### `nix path-info`

作用：

看 store path 的信息。

最常见的用法是看大小：

```bash
nix path-info -Sh .#my-package
```

### `nix log`

作用：

查看构建日志。

适合：

- 构建失败时排错
- 看某个 derivation 到底在哪一步挂了

### `nix why-depends`

作用：

回答一个很经典的问题：

“为什么 A 会依赖 B？”

这条命令对排查闭包太大、依赖链奇怪特别有用。

### `nix fmt`

作用：

格式化 `.nix` 文件。

### `nix edit`

作用：

直接打开某个 nixpkgs 包的定义。

例子：

```bash
nix edit nixpkgs#ripgrep
```

### `nix copy`

作用：

在不同机器或不同 store 之间复制构建产物。

这个命令偏高级，但做远程构建、远程部署时很有价值。

### `nix hash`

作用：

计算或转换 hash。

写包、fetch 源码时经常会碰到。

## 清理和磁盘空间

### `nix-collect-garbage -d`

这是你现在已经在用的命令，完全合理。

可以把它理解成：

- 删除旧 generations
- 然后尽量回收已经没引用的 store 内容

`-d` 的意思可以粗略理解成：

“连旧快照一起清掉。”

### `nix store gc`

新版 CLI 的垃圾回收命令。

### `nix-store --gc`

老版 CLI 的垃圾回收命令。

### `nix-store --optimise`

作用：

对 `/nix/store` 做去重优化，节省磁盘空间。

它不是删除东西，而是尽量把重复内容合并。

## 先别急着学的命令

下面这些命令不是不能用，而是新手阶段没必要把它们当主力：

- `nix-env`
  老式命令式安装
- `nix-shell`
  大部分场景已经被 `nix develop` / `nix shell` 取代
- `nix-build`
  大部分场景已经被 `nix build` 取代
- `nix-channel`
  flakes 工作流里通常不需要
- `nix-instantiate`
  太底层

如果你看到老教程大量使用这些命令，不代表它错，只是说明那篇教程属于旧工作流。

## 面向新手的最小命令集

如果你只想记最实用的一套，先记这 8 个：

- `nix develop`
- `nix shell`
- `nix run`
- `nix build`
- `nix flake show`
- `nix flake update`
- `nh os switch` 或 `nixos-rebuild switch`
- `nix-collect-garbage -d`

## 一句话速查

- 我要开发项目：`nix develop`
- 我要临时用一个工具：`nix shell`
- 我要直接跑一个程序：`nix run`
- 我要构建结果：`nix build`
- 我要看 flake 里有什么：`nix flake show`
- 我要更新锁文件：`nix flake update`
- 我要切系统：`nh os switch`
- 我要清垃圾：`nix-collect-garbage -d`

## 官方文档

- Nix 手册总入口：https://nix.dev/manual/nix
- `nix develop`：https://nix.dev/manual/nix/2.31/command-ref/new-cli/nix3-develop
- `nix build`：https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-build
- `nix run`：https://nix.dev/manual/nix/2.20/command-ref/new-cli/nix3-run
- `nix search`：https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-search
- `nix profile`：https://nix.dev/manual/nix/2.25/command-ref/new-cli/nix3-profile-list
- `nix-collect-garbage`：https://nix.dev/manual/nix/2.31/command-ref/nix-collect-garbage.html
- `nix store gc`：https://nix.dev/manual/nix/2.23/command-ref/new-cli/nix3-store-gc
- `nix-store --gc`：https://nix.dev/manual/nix/stable/command-ref/nix-store/gc
- NixOS 手册：https://nixos.org/manual/nixos/stable/

## 最后一句建议

新手阶段不要追求“把 Nix 所有命令背下来”。

只要先把这 4 类事情分清楚，你就会轻松很多：

- 项目开发：`nix develop`
- 临时工具：`nix shell`
- 系统切换：`nixos-rebuild` / `nh`
- 清理垃圾：`nix-collect-garbage -d`
