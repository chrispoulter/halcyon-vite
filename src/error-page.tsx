import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

export function ErrorPage() {
    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Helmet>
                <title>Error</title>
            </Helmet>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Error
            </h1>

            <p className="leading-7">
                Sorry, something went wrong. Please try again later.
            </p>

            <Button asChild className="w-full sm:w-auto">
                <Link to="/">Home</Link>
            </Button>
        </main>
    );
}
