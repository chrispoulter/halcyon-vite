import { Link } from 'react-router';
import { ChangePasswordForm } from '@/features/profile/change-password/change-password-form';
import { ChangePasswordLoading } from '@/features/profile/change-password/change-password-loading';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';

export function ChangePasswordPage() {
    const { data: profile } = useGetProfile();

    if (!profile) {
        return <ChangePasswordLoading />;
    }

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
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
