---
title: Поднимаем Redpanda(Kafka) в кластере Kubernetes k3s
date: 2025-08-24 13:15:00 +0700
categories: [DevOps]
tags: [devops, k3s, argocd, kafka, redpanda]
---

Заметка про разворачивание Redpanda в домашнем кластере Kubernetes k3s с помощью ArgoCD

Исходные данные - Gitlab и кластер Kubernetes k3s с ArgoCD

Redpanda реализует по сути классическую Apache Kafka с совместимым API, но более производительную и бережную к ресурсам, что как раз подходит для разворачивания в домашней лаборатории.
Подробнее https://www.redpanda.com/

[В прошлой статье]({% link _posts/2025-08-24-bootstrap-repo-for-argocd.md %}) описано создание bootstrap репозитория для ArgoCD, как раз в него мы и положим новый манифест для redpanda.

### Пишем манифест деплоя redpanda.yaml для ArgoCD

Пример манифеста для деплоя из helm чарта, с настройкой ingress через nodeport ноды кластера

``` yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: redpanda
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://charts.redpanda.com'
    targetRevision: 5.9.24
    chart: redpanda
    helm:
      values: |
        enterprise:
          enabled: false
        statefulset:
          replicas: 1
        storage:
          persistentVolume:
            enabled: true
            size: 5Gi
        external:
          enabled: true
          service:
            type: NodePort
            external:
              domain: redpanda.local
        console:
          enabled: true
          ingress:
            enabled: true
            ingressClassName: traefik
            hosts:
              - host: redpanda.local
                paths:
                  - path: /
                    pathType: Prefix
            tls: []
        tls:
          enabled: false
          certManager:
            enabled: false
          selfSigned:
            enabled: false
        resources:
          requests:
            cpu: 500m
            memory: 1500Mi
          limits:
            cpu: 1000m
            memory: 2Gi
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: redpanda
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

Закидываем его в папку app в нашем bootstrap репо и синхронизируем изменения в ArgoCD

### Доступ в интерфейс Redpanda

Добавим в DNS новую запись для работы ingress
```
redpanda.local ip-адрес ноды кластера k3s
```
Интерфейс будет доступен по адресу http://redpanda.local
