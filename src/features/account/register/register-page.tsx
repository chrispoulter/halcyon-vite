import { Link as RouterLink } from 'react-router';
import { Link, Container, Box, Typography } from '@mui/material';
import { RegisterForm } from '@/features/account/register/register-form';

export function RegisterPage() {
    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Register
                </Typography>

                <Typography variant="body1">
                    Register for a new account to access the full range of
                    features available on this site.
                </Typography>

                <RegisterForm />

                <Typography variant="body1">
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/account/login">
                        Log in now
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
