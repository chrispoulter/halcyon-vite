import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';

type DeleteAccountButtonProps = {
    profile: GetProfileResponse;
};

export function DeleteAccountButton({ profile }: DeleteAccountButtonProps) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { clearSession } = useSession();

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

                    clearSession();

                    navigate('/');
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'flex-end',
                    gap: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="error"
                    onClick={onOpen}
                    disabled={isPending}
                >
                    Delete Account
                </Button>
            </Box>

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
