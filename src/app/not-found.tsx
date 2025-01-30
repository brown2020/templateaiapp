import { Metadata } from 'next';
import Link from 'next/link';
import { House } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export const metadata: Metadata = {
    title: '404 - Page not found',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="text-center">
                <p className="text-base font-normal text-muted-foreground">404</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
                <p className="mt-6 text-base text-muted-foreground">
                    Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for. Please check the URL
                    <br />
                    or navigate back home.
                </p>
                <Link
                    href={ROUTES.DASHBOARD}
                    className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <House className="mr-1 h-4 w-4" />
                    Go to homepage
                </Link>
            </div>
        </div>
    );
}
