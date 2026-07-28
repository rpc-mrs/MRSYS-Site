#!/bin/bash

# 1. Скачиваем официальный автоматический скрипт-инициализатор для Docker + Nginx + Certbot
curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh

# 2. Настраиваем конфигурацию прямо внутри скрипта под ваш домен
# Заменяем тестовые домены на ваш mrsys.ru
sed -i 's/domains=(example.org www.example.org)/domains=(mrsys.ru www.mrsys.ru)/g' init-letsencrypt.sh

# Указываем ваш корпоративный email для уведомлений Let's Encrypt
sed -i 's/email=""/email="dir@mrsys.ru"/g' init-letsencrypt.sh

# 3. Делаем скрипт исполняемым и запускаем его
chmod +x init-letsencrypt.sh
./init-letsencrypt.sh
