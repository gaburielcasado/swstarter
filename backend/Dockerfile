FROM laravelsail/php82-composer

WORKDIR /var/www/html

COPY . .
COPY .env.example .env
COPY docker-entrypoint.sh /usr/local/bin/

RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl netcat-openbsd cron \
    procps \
    && docker-php-ext-install pdo_mysql \
    && composer install

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
