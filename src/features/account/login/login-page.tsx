import { Link as RouterLink } from 'react-router';
import { Link, Container, Box, Typography } from '@mui/material';
import { LoginForm } from '@/features/account/login/login-form';

export default function LoginPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Login
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Enter your email address below to login to your account.
                </Typography>

                <LoginForm />

                <Typography variant="body1" gutterBottom>
                    Not already a member?{' '}
                    <Link component={RouterLink} to="/account/register">
                        Register now
                    </Link>
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Forgotten your password?{' '}
                    <Link component={RouterLink} to="/account/forgot-password">
                        Request reset
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
