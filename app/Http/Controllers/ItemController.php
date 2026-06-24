<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('item/index', [
            'items' => Item::with([
                'category',
                'creator',
            ])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('item/create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category_id' => ['nullable', 'exists:categories,id'],
        ]);

        Item::create([
            ...$validated,
            'creator_id' => auth()->id(),
        ]);

        return redirect('/item');
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        $item->load([
            'category',
            'creator',
            'reviews.user',
            'reviews.ratings.criterion',
            'reviews.images',
        ]);

        return Inertia::render('item/show', [
            'item' => $item,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        abort_unless(auth()->user()->isAdmin(), 403);

        $item->delete();

        return redirect()->route('item.index');
    }
}
