import { Metadata } from '@/components/metadata';
import { SignoutRoute } from '@/components/signout-route';
import { UpdateProfileForm } from '@/features/profile/update-profile/update-profile-form';
import { UpdateProfileLoading } from '@/features/profile/update-profile/update-profile-loading';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { ApiClientError } from '@/lib/api-client';
import { ErrorPage } from '@/error-page';
import { NotFoundPage } from '@/not-found-page';
import { ForbiddenPage } from '@/forbidden-page';

export function UpdateProfilePage() {
    const { data: profile, isLoading, isSuccess, error } = useGetProfile();

    if (isLoading) {
        return <UpdateProfileLoading />;
    }

    if (!isSuccess) {
        if (error instanceof ApiClientError) {
            switch (error.status) {
                case 401:
                    return <SignoutRoute />;

                case 403:
                    return <ForbiddenPage />;

                case 404:
                    return <NotFoundPage />;
            }
        }

        return <ErrorPage />;
    }

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Metadata title="Update Profile" />

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Update Profile
            </h1>

            <p className="leading-7">
                Update your personal details below. Your email address is used
                to login to your account.
            </p>

            <UpdateProfileForm profile={profile} />
        </main>
    );
}
