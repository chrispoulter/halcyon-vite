import { useParams } from 'react-router';
import { Container, Box, Typography } from '@mui/material';
import { ResetPasswordForm } from '@/features/account/reset-password/reset-password-form';

export function ResetPasswordPage() {
    const { token } = useParams();

    console.log('token', token);

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Reset Password
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Reset your password below. Choose a strong password and
                    don&apos;t reuse it for other accounts. For security
                    reasons, change your password on a regular basis.
                </Typography>

                <ResetPasswordForm />
            </Box>
        </Container>
    );
}
