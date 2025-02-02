---
title: Установка Postgrespro-1C-13 на Ubuntu 20.04
date: 2025-02-01 16:16:16 +0700
categories: [Linux]
tags: [linux, postgres, 1C]
---

Заметка на тему установки базы данных PostgreSQL оптимизированной под работу 1С. 
Рассматривается установка на ОС Ubuntu 20.04 с обычным механизмом репликации.

### Master node
    $ sudo -i
    # dpkg-reconfigure locales
    Выбираем ru_RU.UTF-8
    # reboot
    Проверяем
    # locale
    # curl -o apt-repo-add.sh https://repo.postgrespro.ru/pg1c-13/keys/apt-repo-add.sh
    # sh apt-repo-add.sh
    # apt install postgrespro-1c-13

---

### Slave node
    $ sudo -i
    # dpkg-reconfigure locales
    Выбираем ru_RU.UTF-8
    # reboot
    Проверяем
    # locale
    # curl -o apt-repo-add.sh https://repo.postgrespro.ru/pg1c-13/keys/apt-repo-add.sh
    # sh apt-repo-add.sh
    # apt install postgrespro-1c-13-contrib

