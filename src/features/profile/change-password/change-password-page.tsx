import { Link as RouterLink } from 'react-router';
import { Link, Container, Box, Typography } from '@mui/material';
import { ChangePasswordForm } from '@/features/profile/change-password/change-password-form';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';

export function ChangePasswordPage() {
    const { data: profile } = useGetProfile();

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Change Password
                </Typography>

                <Typography variant="body1">
                    Change your password below. Choose a strong password and
                    don&apos;t reuse it for other accounts. For security
                    reasons, change your password on a regular basis.
                </Typography>

                <ChangePasswordForm profile={profile} />

                <Typography variant="body1">
                    Forgotten your password?{' '}
                    <Link component={RouterLink} to="/account/forgot-password">
                        Request reset
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
