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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/criterion');
    };

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Kriterium erstellen
                    </CardTitle>

                    <CardDescription>
                        Erstelle ein neues Bewertungskriterium
                        (z. B. Design, Akku, Preis-Leistung).
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {errors && Object.keys(errors).length > 0 && (
                        <div className="text-red-500">
                            {Object.values(errors).map((e, i) => (
                                <p key={i}>{e}</p>
                            ))}
                        </div>
                    )}
                    <form
                        onSubmit={submit}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name
                            </Label>

                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData(
                                        'name',
                                        e.target.value
                                    )
                                }
                                placeholder="z. B. Design"
                            />

                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            Erstellen
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
