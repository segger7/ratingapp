import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home({ items, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const { auth } = usePage().props;

    const submitSearch = (e) => {
        e.preventDefault();

        router.get('/', { search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="container mx-auto py-8 space-y-6">

            {/* TOP BAR */}
            <div className="flex items-center justify-between gap-4">
                <form onSubmit={submitSearch} className="flex gap-2 flex-1">
                    <Input
                        placeholder="Suche nach Items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Button type="submit">
                        Suchen
                    </Button>
                </form>

                <Button asChild>
                    <Link href="/item/create">
                        Neues Item
                    </Link>
                </Button>
            </div>

            {/* FEED */}
            <div className="space-y-4">
                {items.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            Keine Items gefunden.
                        </CardContent>
                    </Card>
                ) : (
                    items.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <span>{item.title}</span>

                                    <span className="text-sm text-muted-foreground">
                                        ⭐ {item.avg_score} / 5
                                    </span>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex justify-between items-center">
                                <div className="text-sm text-muted-foreground">
                                    {item.category?.name ?? 'Keine Kategorie'}
                                </div>

                                <div className="flex gap-2">
                                    <Button asChild variant="outline">
                                        <Link href={`/item/${item.id}`}>
                                            Öffnen
                                        </Link>
                                    </Button>

                                    {/* USER RATING STATUS */}
                                    {item.has_review ? (
                                        <div className="px-3 py-2 text-sm border rounded-md">
                                            Deine Bewertung: {item.user_score} / 5
                                        </div>
                                    ) : (
                                        (auth?.user ? (
                                            <>
                                            <Button asChild>
                                                <Link href={`/item/${item.id}/rate`}>
                                                    Bewerten
                                                </Link>
                                            </Button>
                                            </>
                                        ) : (
                                            <>
                                            <div className="px-3 py-2 text-sm border rounded-md">
                                                Anmelden um zu bewerten!
                                            </div>
                                            </>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
