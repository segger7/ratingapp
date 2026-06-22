import { Link } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function Show({ item }) {
    return (
        <div className="container mx-auto max-w-4xl py-8 space-y-6">

            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {item.title}
                    </h1>

                    <p className="text-muted-foreground">
                        von {item.creator?.name ?? 'Unbekannt'}
                    </p>
                </div>

                <Button variant="outline" asChild>
                    <Link href="/item">
                        Zurück
                    </Link>
                </Button>
            </div>

            {/* INFO CARD */}
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                    <CardDescription>
                        Kategorie & Beschreibung
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium">
                            Kategorie
                        </p>

                        <p className="text-muted-foreground">
                            {item.category?.name ?? 'Keine Kategorie'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium">
                            Beschreibung
                        </p>

                        <p className="text-muted-foreground whitespace-pre-line">
                            {item.description ||
                                'Keine Beschreibung vorhanden'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* REVIEWS */}
            <Card>
                <CardHeader>
                    <CardTitle>Bewertungen</CardTitle>
                    <CardDescription>
                        Nutzerbewertungen für dieses Item
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Link href={`/item/${item.id}/rate`}>
                        Eintrag bewerten
                    </Link>
                    {item.reviews.length === 0 ? (
                        <p className="text-muted-foreground">
                            Noch keine Bewertungen vorhanden.
                        </p>
                    ) : (
                        item.reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border rounded-lg p-4 space-y-2"
                            >
                                <div className="flex justify-between">
                                    <p className="font-medium">
                                        {review.user?.name ??
                                            'Unbekannt'}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {review.overall_score ?? '-'} / 5
                                    </p>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {review.comment}
                                </p>

                                {/* RATINGS */}
                                {review.ratings?.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                        {review.ratings.map(
                                            (rating) => (
                                                <div
                                                    key={rating.id}
                                                    className="flex justify-between text-sm"
                                                >
                                                    <span>
                                                        {rating
                                                            .criterion
                                                            ?.name}
                                                    </span>

                                                    <span>
                                                        {rating.score} / 5
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* IMAGES */}
                                {review.images?.length > 0 && (
                                    <div className="flex gap-2 mt-3 flex-wrap">
                                        {review.images.map(
                                            (img) => (
                                                <img
                                                    key={img.id}
                                                    src={img.url}
                                                    className="w-24 h-24 object-cover rounded-md border"
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
