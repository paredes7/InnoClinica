import Header from '@/Components/Principal/Header';
import { Head, Link } from '@inertiajs/react';

export default function Home({}) {
    return (
        <>
            <Head title="InnoClinica with Laravel" />
            <Header />
            <main className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-gray-800">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a InnoClinica</h1>
            </main>
        </>
    );
}
