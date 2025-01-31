import { useSearchParams, Link } from 'react-router';
import { z } from 'zod';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Metadata } from '@/components/metadata';
import { Pager } from '@/components/pager';
import { useSearchUsers } from '@/features/user/hooks/use-search-users';
import { SearchUsersLoading } from '@/features/user/search-users/search-users-loading';
import { SearchUserForm } from '@/features/user/search-users/search-user-form';
import { SortUserDropdown } from '@/features/user/search-users/sort-user-dropdown';
import { UserCard } from '@/features/user/search-users/user-card';
import { UserSort } from '@/features/user/user-types';
import { ErrorPage } from '@/error-page';

const searchParamsSchema = z.object({
    search: z.string({ message: 'Search must be a valid string' }).catch(''),
    page: z.coerce
        .number({ message: 'Page must be a valid number' })
        .int('Page must be a valid integer')
        .positive('Page must be a postive number')
        .catch(1),
    sort: z
        .nativeEnum(UserSort, {
            message: 'Sort must be a valid user sort',
        })
        .catch(UserSort.NAME_ASC),
});

const PAGE_SIZE = 10;

export function SearchUsersPage() {
    const [searchParams] = useSearchParams();

    const request = searchParamsSchema.parse(Object.fromEntries(searchParams));

    const { data, isFetching, isSuccess } = useSearchUsers({
        ...request,
        size: PAGE_SIZE,
    });

    if (isFetching) {
        return <SearchUsersLoading />;
    }

    if (!isSuccess) {
        return <ErrorPage />;
    }

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Metadata title="Users" />

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Users
            </h1>

            <div className="flex gap-2">
                <SearchUserForm search={request.search} />
                <SortUserDropdown sort={request.sort} />
            </div>

            <Button asChild className="w-full sm:w-auto">
                <Link to="/user/create">Create New</Link>
            </Button>

            {data?.items.length ? (
                <div className="space-y-2">
                    {data.items.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Results</AlertTitle>
                    <AlertDescription>
                        No users could be found.
                    </AlertDescription>
                </Alert>
            )}

            <Pager
                hasPreviousPage={data.hasPreviousPage}
                hasNextPage={data.hasNextPage}
                page={request.page}
            />
        </main>
    );
}
