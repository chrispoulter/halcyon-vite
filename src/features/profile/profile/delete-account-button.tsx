import { useNavigate } from 'react-router';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LoadingButton } from '@/components/loading-button';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

type DeleteAccountButtonProps = {
    profile: GetProfileResponse;
    className?: string;
};

export function DeleteAccountButton({
    profile,
    className,
}: DeleteAccountButtonProps) {
    const navigate = useNavigate();

    const { clearAuth } = useAuth();

    const { mutate, isPending } = useDeleteAccount();

    function onDelete() {
        mutate(
            {
                version: profile.version,
            },
            {
                onSuccess: async () => {
                    toast({
                        title: 'Success',
                        description: 'Your account has been deleted.',
                    });

                    clearAuth();

                    return navigate('/');
                },
            }
        );
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <LoadingButton
                    variant="destructive"
                    loading={isPending}
                    className={className}
                >
                    Delete Account
                </LoadingButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={onDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
