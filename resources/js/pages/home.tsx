import { Head, Link, usePage } from '@inertiajs/react';
//import { dashboard, login } from '@/routes';

export default function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <div>
                <h1>Test 1</h1>

                {auth.user ? (
                    <p>Hallo {auth.user.name}</p>
                ) : (
                    <p>Nicht eingeloggt</p>
                )}
            </div>
        </>
    );
}
