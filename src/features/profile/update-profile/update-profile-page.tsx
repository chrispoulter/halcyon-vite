import { Container, Box, Typography } from '@mui/material';
import { UpdateProfileForm } from '@/features/profile/update-profile/update-profile-form';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';

export function UpdateProfilePage() {
    const { data: profile } = useGetProfile();

    if (!profile) {
        return null;
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Update Profile
                </Typography>

                <Typography variant="body1">
                    Update your personal details below. Your email address is
                    used to login to your account.
                </Typography>

                <UpdateProfileForm profile={profile} />
            </Box>
        </Container>
    );
}
