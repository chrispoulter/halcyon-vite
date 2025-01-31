import { Metadata } from '@/components/metadata';
import { ForgotPasswordForm } from '@/features/account/forgot-password/forgot-password-form';

export function ForgotPasswordPage() {
    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
            <Metadata title="Forgot Password" />

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Forgot Password
            </h1>

            <p className="leading-7">
                Request a password reset link by providing your email address.
            </p>

            <ForgotPasswordForm />
        </main>
    );
}
