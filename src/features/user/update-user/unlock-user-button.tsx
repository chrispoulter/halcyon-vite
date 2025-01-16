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
import { useUnlockUser } from '@/features/user/hooks/use-unlock-user';
import { GetUserResponse } from '@/features/user/user-types';

type UnlockUserButtonProps = {
    profile: GetUserResponse;
};

export function UnlockUserButton({ profile }: UnlockUserButtonProps) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isPending } = useUnlockUser(profile.id);

    function onDelete() {
        mutate(
            {
                version: profile.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('User successfully unlocked.', {
                        variant: 'success',
                    });

                    return navigate(0);
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
                    Unlock
                </Button>
            </Box>

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
