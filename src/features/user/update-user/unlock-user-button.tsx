import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useUnlockUser } from '@/features/user/hooks/use-unlock-user';
import { GetUserResponse } from '@/features/user/user-types';

type UnlockUserButtonProps = {
    user: GetUserResponse;
};

export function UnlockUserButton({ user }: UnlockUserButtonProps) {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = useUnlockUser(user.id);

    function onDelete() {
        mutate(
            {
                version: user.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('User successfully unlocked.', {
                        variant: 'success',
                    });
                },
            }
        );

        setOpen(false);
    }

    function onOpen() {
        setOpen(true);
    }

    function onClose() {
        setOpen(false);
    }

    return (
        <>
            <Button variant="outlined" onClick={onOpen} disabled={isPending}>
                Unlock
            </Button>

            <Dialog open={open} onClose={onClose}>
                <DialogTitle id="alert-dialog-title">Unlock User</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to unlock this user account? The
                        user will now be able to access the system.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onDelete} disabled={isPending} autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
