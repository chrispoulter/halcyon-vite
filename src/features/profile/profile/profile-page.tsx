import { Container, Box, Typography } from '@mui/material';
import { DeleteAccountButton } from '@/features/profile/profile/delete-account-button';

export function ProfilePage() {
    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    My Account
                </Typography>

                <Typography component="h2" variant="h4">
                    Personal Details
                </Typography>

                <Typography component="h2" variant="h4">
                    Login Details
                </Typography>

                <Typography variant="body1">
                    Choose a strong password and don&apos;t reuse it for other
                    accounts. For security reasons, change your password on a
                    regular basis.
                </Typography>

                <Typography component="h2" variant="h4">
                    Settings
                </Typography>

                <Typography variant="body1">
                    Once you delete your account all of your data and settings
                    will be removed. Please be certain.
                </Typography>

                <DeleteAccountButton />
            </Box>
        </Container>
    );
}
