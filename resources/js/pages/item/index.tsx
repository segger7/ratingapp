import { Link } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function Index({ items }) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Einträge
                    </h1>

                    <p className="text-muted-foreground">
                        Alle Einträge
                    </p>
                </div>

                <Button asChild>
                    <Link href="/item/create">
                        Neuer Eintrag
                    </Link>
                </Button>
            </div>

            {items.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center">
                        Noch keine Einträge vorhanden.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle>
                                    {item.title}
                                </CardTitle>

                                <CardDescription>
                                    Erstellt von{' '}
                                    {item.creator?.name ??
                                        'Unbekannt'}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                    {item.description ||
                                        'Keine Beschreibung vorhanden'}
                                </p>

                                {item.category && (
                                    <div className="mb-4">
                                        <span className="rounded-md border px-2 py-1 text-xs">
                                            {item.category.name}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        asChild
                                    >
                                        <Link
                                            href={`/item/${item.id}`}
                                        >
                                            Anzeigen
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
