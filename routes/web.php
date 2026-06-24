<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RatingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CriterionController;

//???
/*Route::resource('item', ItemController::class);
Route::resource('reviews', ReviewController::class);
Route::resource('categories', CategoryController::class);
Route::resource('criteria', CriterionController::class);
Route::resource('ratings', RatingController::class);*/

Route::inertia('/', 'home');

Route::inertia('/register', 'auth/register')->name('register');
Route::inertia('/login', 'auth/login')->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    //Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/item', [ItemController::class, 'index']);
    Route::get('/item/create', [ItemController::class, 'create']);
    Route::post('/item', [ItemController::class, 'store']);
    Route::get('/item/{item}', [ItemController::class, 'show']);
    Route::get('/item/{item}/rate', [RatingController::class, 'create']);
    Route::post('/item/{item}/rate', [RatingController::class, 'store']);

});

Route::middleware(['auth', 'admin', 'verified'])->group(function () {
    Route::get('/criterion', [CriterionController::class, 'index']);
    Route::get('/criterion/create', [CriterionController::class, 'create']);
    Route::post('/criterion', [CriterionController::class, 'store']);
    Route::delete('/criterion/{criterion}', [CriterionController::class, 'destroy']);
    Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
    Route::delete('/category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');
});

require __DIR__.'/settings.php';
