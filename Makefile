# MMT Admin App - Development Commands

.PHONY: help dev-frontend dev-backend install-frontend install-backend migrate seed reset

# Default target
help:
	@echo "Available commands:"
	@echo "  dev-frontend    - Start frontend development server"
	@echo "  dev-backend     - Start backend development server"
	@echo "  install-frontend - Install frontend dependencies"
	@echo "  install-backend  - Install backend dependencies"
	@echo "  migrate         - Run database migrations"
	@echo "  seed           - Seed database with sample data"
	@echo "  reset          - Reset database with fresh data"

# Start frontend development
dev-frontend:
	cd frontend && npm run dev

# Start backend development
dev-backend:
	cd backend && php artisan serve

# Install frontend dependencies
install-frontend:
	cd frontend && npm install

# Install backend dependencies
install-backend:
	cd backend && composer install

# Run database migrations
migrate:
	cd backend && php artisan migrate

# Seed database
seed:
	cd backend && php artisan db:seed

# Reset database with fresh data
reset:
	cd backend && php artisan migrate:fresh --seed