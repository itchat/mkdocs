# macOS Virtual Machine

> 孙悟空，早就死了！八戒，你心里明白，你那师兄，从来没那么圆满。

## 执念

上学期修了一门 Cybersecurity, 用到了 UTM 运行 Kali Linux 虚拟机，因此触发了一些被创造的需求，也是执念的开始。

## VMware Fusion

其优点为可以在网上随意找一个 Key 粘贴，然后正版丝滑更新正常使用。缺点为无法像 UTM 一样直接运行 x86 系统，需要专门寻找 ARM 版本下载运行。但 Windows 11 ARM 版内置 ARM to x86 指令集转译，可以丝滑运行所有虚拟机里的 x86 应用，大约会占用接近 40 G 空间，可以流畅运行植物大战僵尸杂交版和其修改器。

此方案在兼容性方面最佳，但需花费大量时间登陆微软账户，激活系统优化设置，并限定虚拟机配置占用处理器和内存等，只适合一些性能占用较低的游戏和软件运行。并且文件配置一旦需要更改，从外部拖动较为麻烦，而本身日常学习没有 Windows 系统使用场景，而家中有一个 Ubuntu 系统的微电脑可以满足计算机课程需要，因此删除。

## CrossOver

从 Wine + Wineskin 以及免费的 Whisky 全部尝试一遍后，发现 CrossOver 这样的商业软件才是容器领域的最佳解决方案，Whisky 的 Wine 版本过低并且没有部分兼容选项，CrossOver 不仅会不断修复主流软件运行 Bug 还会保持容器最新版本。搭配 [Game Porting Toolkit 2](https://developer.apple.com/games/game-porting-toolkit/) 能正常 Steam 玩游戏以及运行部分 3D 离线软件，免除繁琐的配置指令并且提供退出重启等快捷按钮。

### Install

从[俄罗斯破解网站](https://appstorrent.ru/185-crossover.html)下载安装最新 CrossOver 安装好后新建 Win10 64-bi t Bottle 并开启 D3DMetal 和 MSync 选项:

> **D3DMetal** 是一个图形 API 翻译层，主要用于将 DirectX 11 和 DirectX 12 游戏移植到 MacOS 系统上 。当启用 D3DMetal 时，它会替代 DXVK 或 Wined3d 默认设置，从而提供更好的游戏性能。
>
> 
>
> **ESync**，即事件同步（event synchronization），是一个由 Wine 提出的补丁集，旨在改善 Windows 应用程序与底层操作系统之间事件的同步。某些应用程序开启 ESync 后性能会显著提升 。这个机制在处理多线程应用时尤为重要，可以减少因线程调度不当导致的性能损失⁴。
>
> 
>
> **MSYNC** 旨在进一步提高在非 Windows 系统中运行的 Windows 应用程序的性能和同步。与 ESync 不同的是，MSYNC 专注于改进多个线程间的协作，能够在特定情况下显著提升游戏体验。MSYNC 已经开始得到支持，使得 Mac 用户也能享受到更稳定的性能改善。

实测后发现 ESync 开启后实际会拖慢 3D 游戏运行速度，推荐游戏只开启 D3D + MSYNC 选项

部分应用中文安装启动过程文字会乱码，点击 Run With Options 在 Command-Line Options 中设置以下环境指令后再启动：

```sh
set lang=zh_cn
```

### GTK 2

简介里已提供了下载链接，实测需使用 Safari 才能正常下载，挂载后会看到 `Evaluation environment for Windows games 2.0.dmg` 文件，打开后同意启动会自动注入系统环境变量，同意打开后会看到一个 `Read Me.rtf` 文件，打开后复制 CrossOver 标题下的指令在 Terminal 中粘贴一件替换 CrossOver 中的兼容层:

```sh
cd /Applications/CrossOver.app/Contents/SharedSupport/CrossOver/lib64/apple_gptk/external
mv D3DMetal.framework D3DMetal.framework-old; mv libd3dshared.dylib libd3dshared.dylib-old
ditto /Volumes/Evaluation\ environment\ for\ Windows\ games\ 2.0/redist/lib/external/ .
```

### Others

Steam 角标在强制退出之后依然会在右上角残留，因此最好手动重启容器，少数情况下使用左上角苹果图标强制退出或执行：

```sh
pkill -f wine
```

Steam 游戏下载完毕后将 steamapps/common 文件夹相关文件作硬盘备份

