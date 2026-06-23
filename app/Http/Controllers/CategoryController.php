<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('category/index', [
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('category/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        Category::create($validated);

        return redirect()->route('category.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return back();
    }
    /* Check:
    public function destroy(Category $category)
    {
        if ($category->items()->exists()) {
            return back()->withErrors([
                'category' => 'Kategorie wird bereits verwendet.',
            ]);
        }

        $category->delete();

        return back();
    }*/
}
