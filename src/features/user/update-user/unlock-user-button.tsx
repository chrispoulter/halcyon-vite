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
import { useUnlockUser } from '@/features/user/hooks/use-unlock-user';
import { GetUserResponse } from '@/features/user/user-types';
import { toast } from '@/hooks/use-toast';

type UnlockUserButtonProps = {
    user: GetUserResponse;
    className?: string;
};

export function UnlockUserButton({ user, className }: UnlockUserButtonProps) {
    const { mutate, isPending } = useUnlockUser(user.id);

    function onUnlock() {
        mutate(
            {
                version: user.version,
            },
            {
                onSuccess: async () => {
                    toast({
                        title: 'Success',
                        description: 'User successfully unlocked.',
                    });
                },
            }
        );
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <LoadingButton
                    variant="secondary"
                    loading={isPending}
                    className={className}
                >
                    Unlock
                </LoadingButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Unlock User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to unlock this user account? The
                        user will now be able to access the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={onUnlock}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
