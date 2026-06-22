import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <h1>Nicht benutzt</h1>
        </>
    );
}
