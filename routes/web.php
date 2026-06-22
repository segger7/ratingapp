<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RatingController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home');

Route::inertia('/register', 'auth/register');
Route::inertia('/login', 'auth/login');

Route::middleware(['auth', 'verified'])->group(function () {
    //Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/item', [ItemController::class, 'index']);
    Route::get('/item/create', [ItemController::class, 'create']);
    Route::post('/item', [ItemController::class, 'store']);
    Route::get('/item/{item}', [ItemController::class, 'show']);
    Route::get('/item/{item}/rate', [RatingController::class, 'create']);
    Route::post('/item/{item}/rate', [RatingController::class, 'store']);
});

require __DIR__.'/settings.php';
