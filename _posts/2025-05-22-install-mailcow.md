---
title: Поднимаем почтовый сервер Mailcow
date: 2025-05-22 22:50:16 +0700
categories: [Linux]
tags: [devops, linux, mailcow, docker]
---

Заметка про разворачивание почтового сервера Mailcow.

Исходные данные - одна нода(ВМка) с Ubuntu 24.04

Характеристики ноды 4 ядра ЦПУ / 2Гб ОЗУ (будем разворачивать без ClamAV)

### Настраиваем DNS

- Прописать А запись mail к домену
- Прописать MX на поддомен mail
- [Записи DKIM, SPF and DMARC(опционально)](https://docs.mailcow.email/getstarted/prerequisite-dns/#dkim-spf-and-dmarc) 

### Устанавливаем Docker

``` bash
curl -fsSL https://get.docker.com | bash
```

### Устанавливаем docker-compose

``` bash
sudo apt install docker-compose -y
```

### Клонируем Mailcow

``` bash
git clone https://github.com/mailcow/mailcow-dockerized
cd mailcow-dockerized
```

### Генерируем конфиг

``` bash
./generate_config.sh
```

### Запускаем!

``` bash
docker compose up -d
```
