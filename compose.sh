# 1. Clone / copy the files into your Laravel project root
# 2. Copy .env.example → .env and adjust DB_* and REDIS_* keys
# 3. Build & start
docker compose up -d --build

# 4. Install Laravel dependencies & run migrations
docker compose exec app composer install --optimize-autoloader --no-dev
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --force

docker cp docker/mariadb/initdb.d/campus.sql  laravel_mariadb:/tmp/ 
docker exec -i laravel_mariadb mariadb -u laravel -psecret laravel -e "source /tmp/campus.sql"

docker logs laravel_mariadb


docker compose exec app php artisan queue:failed-table


# (inside the container)
docker compose exec app composer install --optimize-autoloader --no-dev
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --force
docker compose exec app supervisorctl restart laravel-queue:*
docker compose exec next sh