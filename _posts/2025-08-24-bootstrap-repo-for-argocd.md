---
title: Bootstrap репозиторий для ArgoCD
date: 2025-08-24 13:10:00 +0700
categories: [DevOps]
tags: [devops, k3s, argocd]
---

Заметка про создание bootstrap репозитория с манифестами для первоначального добавления в ArgoCD

Исходные данные - Gitlab и кластер Kubernetes k3s с ArgoCD

Для реализации GitOps подхода в домашней лаборатории нужно иметь bootstrap репозиторий для ArgoCD.
Что он нам даст? Это репозиторий который один раз мы добавим в ArgoCD вручную и после этого все управление ресурсами k3s будем производить кодом в гите.

### Создаем bootstrap репозиторий в Gitlab

Ниже идет пример readme.md файла для этого репо, который описывает простую иерархию проекта и способ первоначального добавления в ArgoCD.

---

# Bootstrap-репо для первоначального добавления в ArgoCD

## Состав репы

- app - манифесты приложений для подключения в ArgoCD из репозиториев
- repo - манифесты репозиториев для подключения в ArgoCD

## Как подключаем

- Добавить репо через UI или CLI (один раз вручную):

``` bash
argocd login <ARGOCD_SERVER>
argocd repo add http://gitlab.local/infra/bootstrap.git --username <your-username> --password <your-token>
```

- Создать апку из этого репо

``` yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: argo-bootstrap
  namespace: argocd
spec:
  project: default
  source:
    repoURL: http://gitlab.local/infra/bootstrap.git
    path: .
    targetRevision: HEAD
    directory:
      recurse: true
      jsonnet: {}
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

- Пить кофе

---

В дальнейшем через этот проект мы сможем подключать новые репозитории и конфигурировать из них ресурсы нашего kubernetes кластера.
