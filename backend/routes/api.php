<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SneakerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\DesignController;

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

    Route::prefix('sneakers')->group(function () {
        Route::get('/', [SneakerController::class, 'index']);
        Route::post('/', [SneakerController::class, 'store']);
        Route::get('/{id}', [SneakerController::class, 'show']);
        Route::put('/{id}', [SneakerController::class, 'update']);
        Route::delete('/{id}', [SneakerController::class, 'destroy']);
    });

    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::get('/brands', [CategoryController::class, 'getBrands']);
        Route::get('/sub-model-categories', [CategoryController::class, 'getSubModelCategories']);
        Route::get('/models', [CategoryController::class, 'getModels']);
    });

    Route::prefix('assets')->group(function () {
        Route::get('/', [AssetController::class, 'index']);
        Route::post('/upload', [AssetController::class, 'upload']);
        Route::get('/{id}', [AssetController::class, 'show']);
        Route::delete('/{id}', [AssetController::class, 'destroy']);
    });

    Route::prefix('designs')->group(function () {
        Route::get('/', [DesignController::class, 'index']);
        Route::post('/', [DesignController::class, 'store']);
        Route::get('/{id}', [DesignController::class, 'show']);
        Route::put('/{id}', [DesignController::class, 'update']);
        Route::delete('/{id}', [DesignController::class, 'destroy']);
    });
});