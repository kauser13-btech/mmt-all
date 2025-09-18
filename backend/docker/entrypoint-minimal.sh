#!/bin/bash

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h mysql -u mmt_user -pmmt_password --silent; do
    echo "MySQL is unavailable - sleeping"
    sleep 2
done

echo "MySQL is ready!"

# Generate application key if not exists
if [ ! -f /app/.env ] || ! grep -q "APP_KEY=" /app/.env || [ -z "$(grep 'APP_KEY=' /app/.env | cut -d'=' -f2)" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed the database
echo "Seeding database..."
php artisan db:seed --force

# Let webdevops handle the service startup
echo "Starting webdevops services..."
exec /entrypoint supervisord