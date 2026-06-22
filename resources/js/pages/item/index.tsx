import { Link } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';

export default function Index({ items }) {

    return (
        <>
            {items.map(item => (
                <p>{item.title}</p>
            ))}
        </>
    );
}
