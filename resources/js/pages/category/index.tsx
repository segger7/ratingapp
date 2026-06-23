import { Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Index({ categories }) {

    const deleteCategory = (category) => {
        if (
            !confirm(
                `"${category.name}" wirklich löschen?`
            )
        ) {
            return;
        }

        router.delete('/category/'+ category.id);
    };

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Kategorien
                </h1>

                <Button asChild>
                    <Link href="/category/create">
                        Neue Kategorie
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Alle Kategorien
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {categories.length === 0 ? (
                        <p className="text-muted-foreground">
                            Noch keine Kategorien vorhanden.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {category.name}
                                        </p>
                                    </div>

                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            deleteCategory(category)
                                        }
                                    >
                                        Löschen
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
