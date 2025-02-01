---
title: Примеры отправки сообщений в телеграм используя curl
date: 2025-02-01 17:16:16 +/-TTTT
categories: [Bash]
tags: [bash, linux, telegram]
---

### Отправка текста
#### Скрипт sendText2Tg.sh

``` bash
#!/bin/bash

CHATID="$1"
MESSAGE="$2"
TOKEN="YOUR_BOT_TOKEN"
TIMEOUT="10"
PARSEMODE="html"

curl -X POST \
-H 'Content-Type: application/json' \
-d "{\"chat_id\": \"$CHATID\", \"text\": \"$MESSAGE\", \"disable_notification\": true}" \
https://api.telegram.org/bot$TOKEN/sendMessage
```

#### Пример использования
    ./sendText2Tg.sh telegram_chat_id "text"

---

### Отправка файла
#### Скрипт sendFile2Tg.sh

``` bash    
#!/bin/bash
    
CHATID="$1"
FILE="$2"
TOKEN="YOUR_BOT_TOKEN"
TIMEOUT="10"

curl -s -F document=@"$FILE" \
https://api.telegram.org/bot$TOKEN/sendDocument?chat_id=$CHATID
```

#### Пример использования
    ./sendFile2Tg.sh telegram_chat_id file_name

### Отправка json в форматировании Markdown
#### Скрипт sendJson2Tg.sh

``` bash
#!/bin/bash

CHATID="$1"
JSON_FILE="$2"
TOKEN="YOUR_BOT_TOKEN"
TIMEOUT="10"

message=$(printf '```\n%s\n```' "cat $JSON_FILE | jq .")

curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" \
-d chat_id="$CHATID" \
-d text="$message" \
-d parse_mode="MarkdownV2"
```

#### Пример использования
    ./sendJson2Tg.sh telegram_chat_id json_file_name
