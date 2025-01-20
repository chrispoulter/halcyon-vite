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
import { useLockUser } from '@/features/user/hooks/use-lock-user';
import { GetUserResponse } from '@/features/user/user-types';

type LockUserButtonProps = {
    user: GetUserResponse;
};

export function LockUserButton({ user }: LockUserButtonProps) {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = useLockUser(user.id);

    function onDelete() {
        mutate(
            {
                version: user.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('User successfully locked.', {
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
                Lock
            </Button>

            <Dialog open={open} onClose={onClose}>
                <DialogTitle id="alert-dialog-title">Lock User</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to lock this user account? The
                        user will no longer be able to access the system.
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
