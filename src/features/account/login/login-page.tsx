import { Link as RouterLink } from 'react-router';
import { Link, Container, Box, Typography } from '@mui/material';
import { LoginForm } from '@/features/account/login/login-form';

export function LoginPage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h1">Login</Typography>

                <Typography variant="body1">
                    Enter your email address below to login to your account.
                </Typography>

                <LoginForm />

                <Typography variant="body1">
                    Not already a member?{' '}
                    <Link component={RouterLink} to="/account/register">
                        Register now
                    </Link>
                </Typography>

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
