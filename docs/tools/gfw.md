# The Great Firewall

## Cloudflare WARP[^1]

`wgcf.exe` 下载安装：[wgcf](https://github.com/ViRb3/wgcf)

```bash
.\wgcf.exe register
.\wgcf.exe generate
```

最后把所有代理服务器关闭，进行 IP 测速调优

[CloudflareWarpSpeedTest](https://github.com/peanut996/CloudflareWarpSpeedTest)

执行相关脚本查看生成的数据，替换 Endpoint 关键词

```bash
qrencode -t ansiutf8 < wgcf-profile.conf
```

[^1]: 在 WireGuard 客户端上使用 [CloudFlare WARP 节点](https://blog.misaka.rest/2023/01/25/wireguard-warp/)