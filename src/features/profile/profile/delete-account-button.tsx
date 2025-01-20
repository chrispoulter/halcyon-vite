import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/hooks/use-auth';

type DeleteAccountButtonProps = {
    profile: GetProfileResponse;
};

export function DeleteAccountButton({ profile }: DeleteAccountButtonProps) {
    const [open, setOpen] = useState(false);

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
                    enqueueSnackbar('Your account has been deleted.', {
                        variant: 'success',
                    });

                    clearAuth();

                    return navigate('/');
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
            <Button
                variant="contained"
                color="error"
                onClick={onOpen}
                disabled={isPending}
            >
                Delete Account
            </Button>

            <Dialog open={open} onClose={onClose}>
                <DialogTitle id="alert-dialog-title">
                    Delete Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
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
