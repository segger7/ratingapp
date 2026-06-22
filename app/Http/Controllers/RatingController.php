<?php

namespace App\Http\Controllers;

use App\Models\Criterion;
use App\Models\Item;
use App\Models\Rating;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Item $item)
    {
        $item->load('reviews');

        return Inertia::render('rating/create', [
            'item' => $item,
            'criteria' => Criterion::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Item $item)
    {
        $validated = $request->validate([
            'comment' => ['nullable', 'string'],
            'overall_score' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'ratings' => ['required', 'array'],
        ]);

        $review = $item->reviews()->create([
            'user_id' => auth()->id(),
            'comment' => $validated['comment'] ?? null,
            'overall_score' => $validated['overall_score'] ?? null,
        ]);

        foreach ($validated['ratings'] as $rating) {
            $review->ratings()->create([
                'criterion_id' => $rating['criterion_id'],
                'score' => $rating['score'],
            ]);
        }

        return redirect()->route('item.show', $item);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rating $rating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rating $rating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rating $rating)
    {
        //
    }
}
