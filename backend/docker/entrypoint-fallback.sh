#!/bin/bash

# Generate application key if not exists
if [ ! -f /var/www/.env ] || ! grep -q "APP_KEY=" /var/www/.env || [ -z "$(grep 'APP_KEY=' /var/www/.env | cut -d'=' -f2)" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed the database
echo "Seeding database..."
php artisan db:seed --force

echo "Starting Laravel development server..."
exec php artisan serve --host=0.0.0.0 --port=8000