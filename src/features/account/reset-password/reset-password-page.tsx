import { useParams } from 'react-router';
import { ResetPasswordForm } from '@/features/account/reset-password/reset-password-form';

type ResetPasswordPageParams = { token: string };

export function ResetPasswordPage() {
    const { token } = useParams() as ResetPasswordPageParams;

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Reset Password
            </h1>

            <p className="leading-7">
                Reset your password below. Choose a strong password and
                don&apos;t reuse it for other accounts. For security reasons,
                change your password on a regular basis.
            </p>

            <ResetPasswordForm token={token} />
        </main>
    );
}
