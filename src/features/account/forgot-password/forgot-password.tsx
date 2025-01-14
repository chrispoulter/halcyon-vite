import { Container, Box, Typography } from '@mui/material';
import { ForgotPasswordForm } from '@/features/account/forgot-password/forgot-password-form';

export function ForgotPasswordPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Forgot Password
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Request a password reset link by providing your email
                    address.
                </Typography>

                <ForgotPasswordForm />
            </Box>
        </Container>
    );
}
