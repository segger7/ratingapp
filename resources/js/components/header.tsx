import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props;

    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center gap-6 px-4">

                <Link
                    href="/"
                    className="font-bold text-lg"
                >
                    RatingApp
                </Link>

                <nav className="flex items-center gap-4">
                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/item">
                        Items
                    </Link>

                    <Link href="/item/create">
                        Neues Item
                    </Link>

                    {auth?.user?.role === 'admin' && (
                        <>
                            <Link href="/category">
                                Kategorien
                            </Link>

                            <Link href="/criterion">
                                Kriterien
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
