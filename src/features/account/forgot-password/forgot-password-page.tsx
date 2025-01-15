import { Container, Box, Typography } from '@mui/material';
import { ForgotPasswordForm } from '@/features/account/forgot-password/forgot-password-form';

export function ForgotPasswordPage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Forgot Password
                </Typography>

                <Typography variant="body1">
                    Request a password reset link by providing your email
                    address.
                </Typography>

                <ForgotPasswordForm />
            </Box>
        </Container>
    );
}
