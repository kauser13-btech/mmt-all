# Laravel API Requirements

This Next.js frontend expects the following Laravel API endpoints to be available:

## Base URL
- API Base URL: `http://localhost:8000/api`
- CSRF Cookie: `http://localhost:8000/sanctum/csrf-cookie`

## Authentication Endpoints

### POST `/api/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response (Success):**
```json
{
  "token": "bearer_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "email_verified_at": null,
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

### POST `/api/register`
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

**Response (Success):**
```json
{
  "token": "bearer_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "email_verified_at": null,
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

### POST `/api/logout`
**Headers:** `Authorization: Bearer {token}`
**Response:** Status 200

### GET `/api/user`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "email_verified_at": null,
  "created_at": "2023-01-01T00:00:00.000000Z",
  "updated_at": "2023-01-01T00:00:00.000000Z"
}
```

## Dashboard Endpoints

### GET `/api/dashboard/stats`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
[
  {
    "name": "Total Users",
    "stat": "71,897",
    "icon": "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    "previousStat": "70,946",
    "change": "12%",
    "changeType": "increase"
  }
]
```

### GET `/api/dashboard/activity`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
[
  {
    "action": "New user registered",
    "user": "John Doe",
    "time": "2 hours ago"
  }
]
```

### GET `/api/users`
**Headers:** `Authorization: Bearer {token}`
**Query Parameters:** `page=1&limit=10`
**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "created_at": "2023-01-01T00:00:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 100,
    "per_page": 10
  }
}
```

## Laravel Setup Requirements

1. **Laravel Sanctum** for API authentication
2. **CORS configuration** to allow requests from `http://localhost:3000`
3. **Validation** for registration with proper error responses
4. **API Resource controllers** for structured responses

### Sample Laravel Routes (routes/api.php)
```php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'stats']);
        Route::get('/activity', [DashboardController::class, 'activity']);
    });

    Route::get('/users', [UserController::class, 'index']);
});
```

### CORS Configuration (config/cors.php)
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```