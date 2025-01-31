import { useParams } from 'react-router';
import { UpdateUserForm } from '@/features/user/update-user/update-user-form';
import { UpdateUserLoading } from '@/features/user/update-user/update-user-loading';
import { useGetUser } from '@/features/user/hooks/use-get-user';

type UpdateUserPageParams = { id: string };

export function UpdateUserPage() {
    const { id } = useParams() as UpdateUserPageParams;

    const { data: user } = useGetUser(id);

    if (!user) {
        return <UpdateUserLoading />;
    }

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <title>{`${user.firstName} ${user.lastName} // Halcyon`}</title>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                User
            </h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                Update
            </h2>

            <p className="leading-7">
                Update the user&apos;s details below. The email address is used
                to login to the account.
            </p>

            <UpdateUserForm user={user} />
        </main>
    );
}
