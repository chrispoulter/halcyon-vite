import { UpdateProfileForm } from '@/features/profile/update-profile/update-profile-form';
import { UpdateProfileLoading } from '@/features/profile/update-profile/update-profile-loading';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';

export function UpdateProfilePage() {
    const { data: profile } = useGetProfile();

    if (!profile) {
        return <UpdateProfileLoading />;
    }

    return (
        <main className="mx-auto max-w-screen-sm space-y-6 p-6">
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
