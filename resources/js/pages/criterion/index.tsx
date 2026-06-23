import { Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function Index({ criteria }) {
    const deleteCriterion = (criterion) => {
        if (
            !confirm(
                `"${criterion.name}" wirklich löschen?`
            )
        ) {
            return;
        }

        router.delete(`/criterion/${criterion.id}`);
    };

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Kriterien
                </h1>

                <Button asChild>
                    <Link href="/criterion/create">
                        Neues Kriterium
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Alle Kriterien
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {criteria.length === 0 ? (
                        <p className="text-muted-foreground">
                            Noch keine Kriterien vorhanden.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {criteria.map((criterion) => (
                                <div
                                    key={criterion.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {criterion.name}
                                        </p>
                                    </div>

                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            deleteCriterion(
                                                criterion
                                            )
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
