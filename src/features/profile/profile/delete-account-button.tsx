import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';

type DeleteAccountButtonProps = {
    profile: GetProfileResponse;
};

export function DeleteAccountButton({ profile }: DeleteAccountButtonProps) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { clearSession } = useSession();

    const { mutate, isPending } = useDeleteAccount();

    const onDelete = () =>
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

    return (
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
                onClick={onDelete}
                disabled={isPending}
            >
                Delete Account
            </Button>
        </Box>
    );
}
