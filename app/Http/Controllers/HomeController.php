<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::query()
            ->with([
                'reviews.ratings',
                'reviews.user',
                'category',
                'creator',
            ])
            ->latest();

        //Suche
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $items = $query->get()->map(function ($item) {
            //durchschnitt bewertungen
            $allRatings = $item->reviews->flatMap->ratings;

            $avg = $allRatings->count()
                ? round($allRatings->avg('score'), 2)
                : 0;

            $userReview = $item->reviews
                ->firstWhere('user_id', auth()->id());

            $userScore = $userReview?->overall_score;

            return [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'creator' => $item->creator,
                'avg_score' => $avg,
                'user_score' => $userScore,
                'has_review' => $userReview !== null,
            ];
        });

        return Inertia::render('home', [
            'items' => $items,
            'filters' => $request->only('search'),
        ]);
    }
}
