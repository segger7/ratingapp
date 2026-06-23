import { useForm } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';

export default function Create({ item, criteria }) {
    const { data, setData, post, processing, errors } = useForm({
        comment: '',
        overall_score: '',
        ratings: criteria.map((c) => ({
            criterion_id: c.id,
            score: 0,
        })),
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/item/${item.id}/rate`);
    };

    const updateScore = (index, value) => {
        const updated = [...data.ratings];
        updated[index].score = value;
        setData('ratings', updated);
    };

    if (criteria.length === 0) {
        return (
            <div className="container mx-auto max-w-3xl py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Keine Bewertung möglich
                        </CardTitle>

                        <CardDescription>
                            Für Bewertungen müssen zuerst Kriterien angelegt werden.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Button asChild>
                            <Link href="/criterion/create">
                                Kriterium erstellen
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-3xl py-8 space-y-6">

            {/* ITEM INFO */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Bewertung für: {item.title}
                    </CardTitle>
                </CardHeader>
            </Card>

            {errors && Object.keys(errors).length > 0 && (
                <div className="text-red-500">
                    {Object.values(errors).map((e, i) => (
                        <p key={i}>{e}</p>
                    ))}
                </div>
            )}

            {/* FORM */}
            <Card>
                <CardHeader>
                    <CardTitle>Neue Bewertung erstellen</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-6">

                        {/* COMMENT */}
                        <div className="space-y-2">
                            <Label>Kommentar</Label>

                            <textarea
                                value={data.comment}
                                onChange={(e) =>
                                    setData('comment', e.target.value)
                                }
                                className="border-input bg-background flex min-h-24 w-full rounded-md border px-3 py-2"
                            />
                        </div>

                        {/* OVERALL SCORE */}
                        <div className="space-y-2">
                            <Label>Gesamtbewertung (0-5)</Label>

                            <input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={data.overall_score}
                                onChange={(e) =>
                                    setData(
                                        'overall_score',
                                        e.target.value
                                    )
                                }
                                className="border rounded p-2 w-full"
                            />
                        </div>

                        {/* CRITERIA */}
                        <div className="space-y-4">
                            <Label>Kriterien</Label>

                            {criteria.map((c, i) => (
                                <div
                                    key={c.id}
                                    className="flex justify-between items-center border p-3 rounded"
                                >
                                    <span>{c.name}</span>

                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="1"
                                        value={
                                            data.ratings[i].score
                                        }
                                        onChange={(e) =>
                                            updateScore(
                                                i,
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-20 border rounded p-1"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* SUBMIT */}
                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            Bewertung absenden
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
