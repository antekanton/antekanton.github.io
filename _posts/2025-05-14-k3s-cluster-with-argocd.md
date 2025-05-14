---
title: Разворачиваем Kubernetes (k3s) кластер с ArgoCD
date: 2025-05-14 17:10:16 +0700
categories: [DevOps]
tags: [devops, linux, k3s, argocd]
---

Заметка про разворачивание домашнего кластера Kubernetes (k3s) на одной ноде.
И ArgoCD для GitOps подхода к управлению деплоями и ресурсами в кластере.

Исходные данные - одна нода(ВМка) с Ubuntu 24.04

Характеристики ноды 10 ядер ЦПУ / 10Гб ОЗУ

#### Установка Kubernetes (k3s)
Для одного узла — идеально подходит k3s (облегчённый Kubernetes от Rancher):

``` bash
curl -sfL https://get.k3s.io | sh -
```

После установки проверяем:

``` bash
sudo kubectl get nodes
```

Kubeconfig лежит в /etc/rancher/k3s/k3s.yaml

Скопируем локально для управления с ПК через Lens(или любой другой IDE для кубера):

``` bash
sudo cat /etc/rancher/k3s/k3s.yaml
```

#### Установка Argo CD

``` bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Создадим IngressRoute в кластере k3s для доступа в интерфейс ArgoCD

``` yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: argocd-server
  namespace: argocd
spec:
  entryPoints:
    - websecure
  routes:
    - kind: Rule
      match: Host(`argocd.local`)
      priority: 10
      services:
        - name: argocd-server
          port: 80
    - kind: Rule
      match: Host(`argocd.local`) && Header(`Content-Type`, `application/grpc`)
      priority: 11
      services:
        - name: argocd-server
          port: 80
          scheme: h2c
  tls:
    certResolver: default
```

Вместо argocd.local свой поддомен ВМки при наличии, либо оставляем argocd.local и прописываем в hosts

https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#traefik-v30

Теперь веб-морда ArgoCD доступна: https://argocd.local

Логин: admin

Пароль:

``` bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```


На этом пока все. Дальше поднимем свой GitLab для хранения кода и манифестов для ArgoCD.


