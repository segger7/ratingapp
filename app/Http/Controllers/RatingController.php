<?php

namespace App\Http\Controllers;

use App\Models\Criterion;
use App\Models\Item;
use App\Models\Rating;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
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

        $criteria = Criterion::all();

        if ($criteria->isEmpty()) {
            return redirect()
                ->route('criterion.create')
                ->with('error', 'Bitte zuerst ein Kriterium erstellen.');
        }

        return Inertia::render('rating/create', [
            'item' => $item,
            'criteria' => $criteria,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Item $item)
    {
        if ($item->reviews()->where('user_id', auth()->id())->exists()) {
            return back()->withErrors('Du hast bereits bewertet.');
        }

        $validated = $request->validate([
            'comment' => ['nullable', 'string'],
            'ratings' => ['required', 'array'],
        ]);

        $overallScore = collect($validated['ratings'])
            ->avg('score');

        $review = $item->reviews()->create([
            'user_id' => auth()->id(),
            'comment' => $validated['comment'] ?? null,
            'overall_score' => round($overallScore, 2),
        ]);

        foreach ($validated['ratings'] as $rating) {
            $review->ratings()->create([
                'criterion_id' => $rating['criterion_id'],
                'score' => $rating['score'],
            ]);
        }

        return redirect('/item/'.$item->id);
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
    public function destroy(Review $review): RedirectResponse
    {

        abort_unless(
            auth()->user()->role === 'admin' ||
            $review->user_id === auth()->id(),
            403
        );

        $review->delete();

        return back();
    }
}
