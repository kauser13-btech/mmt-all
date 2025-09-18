# MMT Admin App

This project is structured into separate frontend and backend directories for modern full-stack development.

## Project Structure

```
mmt-admin-app/
├── frontend/              # Next.js React application
├── backend/               # Laravel API application
├── Makefile              # Development commands
└── README.md             # This file
```

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mmt-admin-app
   ```

2. **Install dependencies:**
   ```bash
   make install-frontend
   make install-backend
   ```

3. **Set up the database:**
   ```bash
   make migrate
   make seed
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   make dev-backend

   # Terminal 2 - Frontend
   make dev-frontend
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🔧 Development Setup

### Frontend (Next.js)

Located in the `frontend/` directory. Contains a React-based admin dashboard with:

- Authentication (login/register)
- Dashboard with stats and activity feed
- User management
- Context-based state management

#### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:3000

### Backend (Laravel API)

Located in the `backend/` directory. Provides a RESTful API with:

- Laravel Sanctum authentication
- User management
- Dashboard statistics
- Activity tracking
- CORS configuration for frontend integration

#### API Endpoints

- `POST /api/login` - User authentication
- `POST /api/register` - User registration
- `POST /api/logout` - User logout (authenticated)
- `GET /api/user` - Get current user (authenticated)
- `GET /api/dashboard/stats` - Dashboard statistics (authenticated)
- `GET /api/dashboard/activity` - Recent activity (authenticated)
- `GET /api/users` - List users with pagination (authenticated)

#### Running the Backend

```bash
cd backend
composer install
php artisan migrate
php artisan db:seed
php artisan serve
```

The API will be available at: http://localhost:8000

## 🔐 Authentication & Test Data

### Test Credentials

- **Email:** `admin@example.com`
- **Password:** `password`

### Sample Data

The application comes pre-seeded with:
- 1 admin user (credentials above)
- 50 additional sample users

## 🛠️ Development Commands

Use the provided Makefile for common development tasks:

```bash
# Install dependencies
make install-frontend
make install-backend

# Start development servers
make dev-frontend     # Start frontend (localhost:3000)
make dev-backend      # Start backend (localhost:8000)

# Database operations
make migrate          # Run migrations
make seed            # Seed database
make reset           # Reset database with fresh data
```

## 🏗️ Architecture

- **Frontend:** Next.js 14 with React Server Components
- **Backend:** Laravel 11 with Sanctum authentication
- **Database:** MySQL 8.0 (containerized with persistent volumes)
- **Web Server:** Nginx (in backend container)
- **Process Manager:** Supervisor (in backend container)

## 🔧 Environment Variables

### Backend (.env.docker)
- `APP_ENV=production`
- `DB_CONNECTION=mysql`
- `DB_HOST=mysql`
- `DB_DATABASE=mmt_admin`
- `SANCTUM_STATEFUL_DOMAINS=localhost:3000`

### MySQL Database
- **Root Password:** `rootpassword`
- **Database:** `mmt_admin` (production), `mmt_admin_dev` (development)
- **User:** `mmt_user`
- **Password:** `mmt_password`
- **Port:** `3306`

### Frontend
- `NEXT_PUBLIC_API_URL=http://localhost:8000`

## 🗄️ Database Management

### Connect to MySQL
```bash
# Using the Makefile
make mysql-cli

# Or directly with docker compose
docker compose exec mysql mysql -u mmt_user -pmmt_password mmt_admin
```

### Database Operations
```bash
# Reset database with fresh data
make db-reset

# View MySQL logs
make logs-mysql

# Access MySQL container shell
make shell-mysql
```

### Database Credentials
- **Host:** `localhost` (from host machine) or `mysql` (from containers)
- **Port:** `3306`
- **Username:** `mmt_user`
- **Password:** `mmt_password`
- **Production DB:** `mmt_admin`
- **Development DB:** `mmt_admin_dev`

## 📝 Development Notes

- MySQL 8.0 with persistent volumes for data retention
- Automatic database initialization with proper charset and collation
- Health checks ensure MySQL is ready before backend starts
- CORS is configured to allow requests between containers
- Hot-reload is available in development mode
- Separate databases for production and development environments

## 🛠️ Troubleshooting

### Docker Build Failures

The project includes multiple Dockerfile options for maximum compatibility:

1. **Debian-based (Default, Most Stable):**
   ```bash
   make use-debian
   make fix-build
   ```

2. **Alpine-based (Smaller Image):**
   ```bash
   make use-alpine
   make fix-build
   ```

3. **Quick fix for current Dockerfile:**
   ```bash
   make fix-build
   ```

4. **Manual cleanup and rebuild:**
   ```bash
   docker compose down -v
   docker system prune -a
   docker compose build --no-cache
   docker compose up
   ```

### Common Build Issues

- **MySQL extension errors**: Missing development headers (fixed in current Dockerfiles)
- **GD extension errors**: Missing image library dependencies (fixed with freetype/jpeg)
- **Build timeouts**: Use `--no-cache` flag or increase Docker memory allocation
- **Permission errors**: Check Docker Desktop settings for file sharing

### Runtime Issues

1. **MySQL connection errors**: Wait for health checks, ensure containers are on same network
2. **Port conflicts**: Ensure ports 3000, 8000, and 3306 are available
3. **Permission errors**: Check file permissions in mounted volumes
4. **Out of memory**: Increase Docker Desktop memory allocation

### Complete Reset

```bash
# Nuclear option - removes everything
make clean
docker system prune -a
make up
```