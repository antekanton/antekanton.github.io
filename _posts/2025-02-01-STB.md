---
title: Настройка репликации Master/Slave Postgrespro-1C-13 на Ubuntu 20.04
date: 2025-02-01 16:16:16 +/-TTTT
categories: [Linux]
tags: [linux, postgres, 1C]
---

### Master node
    $ sudo -u postgres psql
    postgres=# CREATE USER replication WITH REPLICATION ENCRYPTED PASSWORD 'пароль';
    postgres=# \q
    $ echo "host replication replication *SLAVE_NODE_IP* md5" >> /var/lib/pgpro/1c-13/data/pg_hba.conf

---

### Slave node
    $ sudo -u postgres pg_basebackup -h *MASTER_NODE_IP* -U  replication -p 5432 -D /var/lib/pgpro/1c-13/data/ -R -P
    $ systemctl enable postgrespro-1c-13.service
    $ sudo systemctl start postgrespro-1c-13.service

---

### Promotion slave to master
    $ sudo -u postgres psql
    postgres=# select pg_promote();
