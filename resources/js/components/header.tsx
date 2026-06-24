import { Link, usePage, router } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props;

    const logout = () => {
        router.post('/logout');
    };

    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* LEFT */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-lg">
                        RatingApp
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link href="/item">
                            Einträge
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

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    {auth?.user ? (
                        <>
                            <span className="text-sm text-muted-foreground">
                                {auth.user.name}
                            </span>

                            <button
                                onClick={logout}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
