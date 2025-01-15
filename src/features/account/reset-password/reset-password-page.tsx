import { useParams } from 'react-router';
import { Container, Box, Typography } from '@mui/material';
import { ResetPasswordForm } from '@/features/account/reset-password/reset-password-form';

type ResetPasswordPageParams = { token: string };

export function ResetPasswordPage() {
    const { token } = useParams() as ResetPasswordPageParams;

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Reset Password
                </Typography>

                <Typography variant="body1">
                    Reset your password below. Choose a strong password and
                    don&apos;t reuse it for other accounts. For security
                    reasons, change your password on a regular basis.
                </Typography>

                <ResetPasswordForm token={token} />
            </Box>
        </Container>
    );
}
