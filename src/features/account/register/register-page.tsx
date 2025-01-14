import { Link as RouterLink } from 'react-router';
import { Link, Container, Box, Typography } from '@mui/material';
import { RegisterForm } from '@/features/account/register/register-form';

export default function RegisterPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Register
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Register for a new account to access the full range of
                    features available on this site.
                </Typography>

                <RegisterForm />

                <Typography variant="body1" gutterBottom>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/account/login">
                        Log in now
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}
