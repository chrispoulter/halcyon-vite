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
import { useDeleteUser } from '@/features/user/hooks/use-delete-user';
import { GetUserResponse } from '@/features/user/user-types';

type DeleteUserButtonProps = {
    profile: GetUserResponse;
};

export function DeleteUserButton({ profile }: DeleteUserButtonProps) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isPending } = useDeleteUser(profile.id);

    function onDelete() {
        mutate(
            {
                version: profile.version,
            },
            {
                onSuccess: async () => {
                    enqueueSnackbar('User successfully deleted.', {
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
                    Delete
                </Button>
            </Box>

            <Dialog open={open} onClose={onClose}>
                <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user account? All
                        of the data will be permanently removed. This action
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
