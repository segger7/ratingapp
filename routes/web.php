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
// Item
    Route::get('/item', [ItemController::class, 'index'])->name('item.index');
    Route::get('/item/create', [ItemController::class, 'create'])->name('item.create');
    Route::post('/item', [ItemController::class, 'store'])->name('item.store');
    Route::get('/item/{item}', [ItemController::class, 'show'])->name('item.show');
    Route::get('/item/{item}/edit', [ItemController::class, 'edit'])->name('item.edit');
    Route::put('/item/{item}', [ItemController::class, 'update'])->name('item.update');
    Route::delete('/item/{item}', [ItemController::class, 'destroy'])->name('item.destroy');

// Rating
    Route::get('/item/{item}/rate', [RatingController::class, 'create'])->name('rating.create');
    Route::post('/item/{item}/rate', [RatingController::class, 'store'])->name('rating.store');

// Criterion
    Route::get('/criterion', [CriterionController::class, 'index'])->name('criterion.index');
    Route::get('/criterion/create', [CriterionController::class, 'create'])->name('criterion.create');
    Route::post('/criterion', [CriterionController::class, 'store'])->name('criterion.store');
    Route::delete('/criterion/{criterion}', [CriterionController::class, 'destroy'])->name('criterion.destroy');
    Route::get('/criterion/{criterion}/edit', [CriterionController::class, 'edit'])->name('criterion.edit');
    Route::put('/criterion/{criterion}', [CriterionController::class, 'update'])->name('criterion.update');

// Category
    Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
    Route::delete('/category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

});

require __DIR__.'/settings.php';
