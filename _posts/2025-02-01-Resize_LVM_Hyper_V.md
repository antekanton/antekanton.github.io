---
title: Увеличение размера LVM раздела Linux ВМ на Hyper-V
date: 2025-02-01 16:16:16 +/-TTTT
categories: [Linux, Windows, Hyper-V]
tags: [linux, lvm, hyper-v]
---

### После ресайза vhd/vdhx на Hyper-V требуется увеличить раздел LVM на Linux ВМ

#### Пример
- Диск sda
- Раздел sda3
- Логический том /dev/ubuntu-vg/ubuntu-lv
- Раздел /dev/mapper/ubuntu—vg-ubuntu—lv

```
$ sudo -i
# fdisk /dev/sda
Command (m for help): d
Command (m for help): n
Command (m for help): w
# pvresize /dev/sda3
# lvextend /dev/ubuntu-vg/ubuntu-lv -l +100%FREE
# resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```
