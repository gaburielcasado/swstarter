#!/bin/sh
set -e

echo "[Entrypoint] Starting up…"

crontab /var/www/html/laravel-cron
service cron start

# wait for MySQL port
echo "[Entrypoint] Waiting for database at $DB_HOST:$DB_PORT…"
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "[Entrypoint]   still waiting…"
  sleep 2
done

echo "[Entrypoint] Database is up – running migrations"
php artisan migrate --force

echo "[Entrypoint] First‐run sync…"
php artisan swapi:sync --no-interaction

echo "[Entrypoint] Migrations complete – starting server"
# exec the CMD from Dockerfile (php artisan serve…)
exec "$@"
