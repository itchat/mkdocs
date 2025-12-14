# Dify + Searxng Plugin

Dify 上配合 Searxng + Webscraper 可快速实现零成本自建并且无速率限制的知识搜索器。

## Quick Start

- Docker 搭建 PagerMaid 或 Dify 服务
- Docker 搭建 Searxng 服务端后在 Dify 安装其 Plugin 并配置，确保与上述服务在同一网络
- 网络配置修改实现 `ufw` 管控 Docker 端口防火墙能力

### PagerMaid-Pyro

```sh
wget https://raw.githubusercontent.com/TeamPGM/PagerMaid-Pyro/development/utils/docker.sh -O docker.sh && chmod +x docker.sh && bash docker.sh
```

更新 `Docker.sh` 中的 `--restart=always` 参数，以及 `--network agent`，最后启动

### Docker Firewall[^1]

```shell
nano /etc/ufw/after.rules
```

```shell
# BEGIN UFW AND DOCKER
*filter
:ufw-user-forward - [0:0]
:DOCKER-USER - [0:0]
-A DOCKER-USER -j RETURN -s 10.0.0.0/8
-A DOCKER-USER -j RETURN -s 172.16.0.0/12
-A DOCKER-USER -j RETURN -s 192.168.0.0/16

-A DOCKER-USER -j ufw-user-forward

-A DOCKER-USER -j DROP -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -d 192.168.0.0/16
-A DOCKER-USER -j DROP -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -d 10.0.0.0/8
-A DOCKER-USER -j DROP -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -d 172.16.0.0/12
-A DOCKER-USER -j DROP -p udp -m udp --dport 0:32767 -d 192.168.0.0/16
-A DOCKER-USER -j DROP -p udp -m udp --dport 0:32767 -d 10.0.0.0/8
-A DOCKER-USER -j DROP -p udp -m udp --dport 0:32767 -d 172.16.0.0/12

-A DOCKER-USER -j RETURN
COMMIT
# END UFW AND DOCKER
```

```shell
sudo systemctl restart ufw
```

### Searxng Setting

```sh
mkdir /searxng
wget https://raw.githubusercontent.com/searxng/searxng/refs/heads/master/searx/settings.yml
nano "/etc/searxng/settings.yml"
```

记下服务器在 ZeroTier 局域网中的 IP 地址，我的为 `192.168.191.170`

```shell
formats:
  - html
  - json
```

首先确保配置中含有 `json` 设置，接着在 `server` 配置选项中为防止被混淆，严格改为 ZeroTier 地址

```shell
server:
  port: 8081
  bind_address: "192.168.191.170"
  base_url: http://192.168.191.170:8081/
  limiter: false
  public_instance: false
```

下面会有一个 `secret_key` 不要动

### Run

```shell
ufw allow 8081
ufw reload
```

```shell
docker run \
  -d -p 8081:8080 \
  -v "${PWD}/searxng:/etc/searxng" \
  -e "BASE_URL=http://192.168.191.170:8081/" \
  -e "INSTANCE_NAME=searxng" \
  --restart always \
  searxng/searxng
```

结束后连上 ZeroTier 服务后如能正常打开直接前往 Dify 安装插件填写 `BASE_URL` 即可，结束安装

## Others

以下是之前尝试的错误设置：

```shell
tail -f /var/log/ufw.log
ufw status numbered
sudo ufw allow from 172.19.0.7 to 192.168.191.170 port 8081
ufw delete num
```

前期有种想法：通过 `ufw` 来精确控制访问，但是其会直接导致 Dify 中大模型使用超时，因此合理做法为在配置中定义精确

[^1]: [What is the best practice of docker + ufw under Ubuntu ](https://stackoverflow.com/questions/30383845/what-is-the-best-practice-of-docker-ufw-under-ubuntu)





