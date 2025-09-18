FROM php:8.3-fpm

# 1. system packages & PHP extensions
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        git unzip libpng-dev libonig-dev libxml2-dev libzip-dev supervisor cron \
 && docker-php-ext-configure gd \
 && docker-php-ext-install -j$(nproc) pdo_mysql mbstring exif pcntl bcmath gd zip \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 3. PHP-FPM production configuration
COPY php/php.ini        /usr/local/etc/php/conf.d/zz-production.ini
COPY php/www.conf       /usr/local/etc/php-fpm.d/www.conf

# 4. Supervisor (unchanged)
COPY php/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /var/www
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

