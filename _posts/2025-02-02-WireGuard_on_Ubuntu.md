---
title: Установка WireGuard с GUI на Ubuntu с помощью Docker
date: 2025-02-03 00:10:16 +0700
categories: [Linux]
tags: [bash, linux, docker, wireguard]
---

Заметка про установку WireGuard с GUI на Ubuntu с помощью Docker. Подойдут ОС Ubuntu версий 22.04 и выше. 
По идее подойдет любая система с поддержкой Docker, но со своими нюансами.

#### Установка Docker

``` bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

#### Генерация хеша пароля для админки WireGuard

``` bash
docker run --rm ghcr.io/wg-easy/wg-easy wgpw YOUR_PASSWORD
```

- Подставить нужный пароль вместо YOUR_PASSWORD

#### Создание директории под конфиги WireGuard

``` bash
mkdir -p /root/.wg-easy
```

#### Создание и запуск Docker контейнера из образа wg-easy

``` bash
docker run -d --name=wg-easy \ 
  -e WG_HOST=YOUR_HOST_IP \
  -e 'PASSWORD_HASH=YOUR_PASSWORD_HASH' \
  -v /root/.wg-easy:/etc/wireguard \
  -p 51820:51820/udp \
  -p 51821:51821/tcp \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE \
  --sysctl=net.ipv4.conf.all.src_valid_mark=1 \
  --sysctl=net.ipv4.ip_forward=1 \
  --restart unless-stopped ghcr.io/wg-easy/wg-easy
```

- WG_HOST - внешний IP адрес хоста
- PASSWORD_HASH - хеш пароля, который сгенерировали ранее

Подробнее про конфигурацию можно почитать на страничке проекта [wg-easy](https://github.com/wg-easy/wg-easy)

После запуска контейнера на порту 51821 будет доступна админка управления конфигурациями WireGuard
