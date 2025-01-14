import { Container, Box, Typography } from '@mui/material';
import { UpdateProfileForm } from '@/features/profile/update-profile/update-profile-form';

export default function UpdateProfilePage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Update Profile
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Update your personal details below. Your email address is
                    used to login to your account.
                </Typography>

                <UpdateProfileForm />
            </Box>
        </Container>
    );
}
