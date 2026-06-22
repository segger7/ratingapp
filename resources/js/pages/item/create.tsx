import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/item');
    };

    return (
        <div className="container mx-auto max-w-3xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Neues Item erstellen</CardTitle>
                    <CardDescription>
                        Erstelle einen neuen Eintrag für das Bewertungssystem.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Titel
                            </Label>

                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />

                            {errors.title && (
                                <p className="text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Beschreibung
                            </Label>

                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="border-input bg-background flex min-h-32 w-full rounded-md border px-3 py-2"
                            />

                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">
                                Kategorie
                            </Label>

                            <select
                                id="category"
                                value={data.category_id}
                                onChange={(e) =>
                                    setData(
                                        'category_id',
                                        e.target.value
                                    )
                                }
                                className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2"
                            >
                                <option value="">
                                    Keine Kategorie
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="text-sm text-red-500">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            Item erstellen
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
