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
import { useLockUser } from '@/features/user/hooks/use-lock-user';
import { GetUserResponse } from '@/features/user/user-types';

type LockUserButtonProps = {
    profile: GetUserResponse;
};

export function LockUserButton({ profile }: LockUserButtonProps) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isPending } = useLockUser(profile.id);

    function onDelete() {
        mutate(
            {
                version: profile.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('User successfully locked.', {
                        variant: 'success',
                    });

                    return navigate('/user');
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
                    Lock
                </Button>
            </Box>

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
