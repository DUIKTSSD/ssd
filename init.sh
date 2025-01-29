#!/bin/bash

echo "🔹 Запуск скрипта ініціалізації..."

# Парсинг аргументів командного рядка
IP=""
RUN_DOCKER=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -ip)
      if [[ -n "$2" ]]; then
        IP="$2"
        shift 2
      else
        echo "❌ Помилка: Значення для -ip не вказано."
        exit 1
      fi
      ;;
    -y)
      RUN_DOCKER=true
      shift
      ;;
    *)
      echo "❌ Помилка: Невідомий аргумент $1"
      exit 1
      ;;
  esac
done

# Перевірка, чи введено IP
if [ -z "$IP" ]; then
  echo "❌ Помилка: Вкажіть IP через -ip <адреса>"
  echo "   Приклад: ./init.sh -ip 34.238.97.50 [-y]"
  exit 1
fi
echo "✅ Використовується IP: $IP"

# Шляхи до файлів
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE="./client/.env"

# Перевірка наявності файлів
if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
  echo "❌ Помилка: файл $DOCKER_COMPOSE_FILE не знайдено!"
  exit 1
fi
echo "✅ Файл $DOCKER_COMPOSE_FILE знайдено."

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Помилка: файл $ENV_FILE не знайдено!"
  exit 1
fi
echo "✅ Файл $ENV_FILE знайдено."

# Оновлення docker-compose.yml
echo "🔹 Оновлення $DOCKER_COMPOSE_FILE..."
if grep -q 'fdomain: http://localhost:8081' "$DOCKER_COMPOSE_FILE"; then
  sed -i "s|fdomain: http://localhost:8081|fdomain: http://$IP:8081|g" "$DOCKER_COMPOSE_FILE"
  echo "✅ fdomain змінено на http://$IP:8081"
else
  echo "⚠️ Увага: fdomain вже містить інший IP або localhost відсутній у файлі."
fi

# Оновлення .env
echo "🔹 Оновлення $ENV_FILE..."
if grep -q 'VITE_APP_BASE_URL=http://localhost:8080' "$ENV_FILE"; then
  sed -i "s|VITE_APP_BASE_URL=http://localhost:8080|VITE_APP_BASE_URL=http://$IP:8080|g" "$ENV_FILE"
  echo "✅ VITE_APP_BASE_URL змінено на http://$IP:8080"
else
  echo "⚠️ Увага: VITE_APP_BASE_URL вже містить інший IP або localhost відсутній у файлі."
fi

echo "🎉 Оновлення завершено!"

# Запуск docker-compose, якщо передано -y
if $RUN_DOCKER; then
  echo "🚀 Запуск docker-compose у прихованому режимі..."
  docker-compose up -d
  if [ $? -eq 0 ]; then
    echo "✅ Docker-compose успішно запущено!"
  else
    echo "❌ Помилка запуску docker-compose!"
    exit 1
  fi
fi
