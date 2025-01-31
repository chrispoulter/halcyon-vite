import { Meta } from '@/components/meta';
import { CreateUserForm } from '@/features/user/create-user/create-user-form';

export function CreateUserPage() {
    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Meta title="Create User" />

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Users
            </h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                Create
            </h2>

            <p className="leading-7">
                Create a new account for a user to access the full range of
                features available on this site.
            </p>

            <CreateUserForm />
        </main>
    );
}
