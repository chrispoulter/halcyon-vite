import { Link } from 'react-router';
import { Metadata } from '@/components/metadata';
import { ChangePasswordForm } from '@/features/profile/change-password/change-password-form';
import { ChangePasswordLoading } from '@/features/profile/change-password/change-password-loading';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { ApiClientError } from '@/lib/api-client';
import { ErrorPage } from '@/error-page';
import { NotFoundPage } from '@/not-found-page';

export function ChangePasswordPage() {
    const { data: profile, isLoading, isSuccess, error } = useGetProfile();

    if (isLoading) {
        return <ChangePasswordLoading />;
    }

    if (!isSuccess) {
        if (error instanceof ApiClientError) {
            switch (error.status) {
                case 404:
                    return <NotFoundPage />;
            }
        }

        return <ErrorPage />;
    }

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Metadata title="Change Password" />

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Change Password
            </h1>

            <p className="leading-7">
                Change your password below. Choose a strong password and
                don&apos;t reuse it for other accounts. For security reasons,
                change your password on a regular basis.
            </p>

            <ChangePasswordForm profile={profile} />

            <p className="text-sm text-muted-foreground">
                Forgotten your password?{' '}
                <Link
                    to="/account/forgot-password"
                    className="underline underline-offset-4"
                >
                    Request reset
                </Link>
            </p>
        </main>
    );
}
