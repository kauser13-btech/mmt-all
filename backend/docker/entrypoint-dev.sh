#!/bin/sh

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h mysql -u mmt_user -pmmt_password --silent; do
    echo "MySQL is unavailable - sleeping"
    sleep 2
done

echo "MySQL is ready!"

# Generate application key if not exists
if [ ! -f /var/www/.env ] || ! grep -q "APP_KEY=" /var/www/.env || [ -z "$(grep 'APP_KEY=' /var/www/.env | cut -d'=' -f2)" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Clear and cache config for development
echo "Clearing configuration cache..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed the database
echo "Seeding database..."
php artisan db:seed --force

# Start supervisor
echo "Starting services..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf