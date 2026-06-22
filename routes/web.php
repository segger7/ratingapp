<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home');

Route::inertia('/register', 'auth/register');
Route::inertia('/login', 'auth/login');

Route::middleware(['auth', 'verified'])->group(function () {
    //Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
