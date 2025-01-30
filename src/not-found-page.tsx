import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Helmet>
                <title>Not Found</title>
            </Helmet>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Not Found
            </h1>

            <p className="leading-7">
                Sorry, the resource you were looking for could not be found.
            </p>

            <Button asChild className="w-full sm:w-auto">
                <Link to="/">Home</Link>
            </Button>
        </main>
    );
}
