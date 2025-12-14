# Cloudflare Tunnel



## Create a Tunnel

https://dash.cloudflare.com/ 登陆后 Network - Connectors 中创建 Tunnel 选择 Cloudflared - Docker，复制指令后在其中添加自启动参数

```sh
--restart unless-stopped
```

Activate 后 configure 这个 tunnel, 去 Published application routes 中添加 Service:

```sh
http http://host.docker.internal:8000
# When accessing the Mac host from a Docker container, always use host.docker.internal.
```

这种非常适合在 Mac 中部署一个连接到本地的大模型服务，而如果是其他 Docker 服务，需要处于同一网络

