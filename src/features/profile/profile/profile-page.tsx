import { Container, Box, Typography } from '@mui/material';
import { DeleteAccountButton } from '@/features/profile/profile/delete-account-button';

export default function ProfilePage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    My Account
                </Typography>

                <Typography variant="h2" gutterBottom>
                    Personal Details
                </Typography>

                <Typography variant="h2" gutterBottom>
                    Login Details
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Choose a strong password and don&apos;t reuse it for other
                    accounts. For security reasons, change your password on a
                    regular basis.
                </Typography>

                <Typography variant="h2" gutterBottom>
                    Settings
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Once you delete your account all of your data and settings
                    will be removed. Please be certain.
                </Typography>

                <DeleteAccountButton />
            </Box>
        </Container>
    );
}
