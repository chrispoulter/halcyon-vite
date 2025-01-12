import { Link as RouterLink } from 'react-router';
import { Link, Container, Box, Typography } from '@mui/material';

export default function Home() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Home
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Vist the{' '}
                    <Link component={RouterLink} to="/about">
                        About
                    </Link>{' '}
                    page.
                </Typography>
            </Box>
        </Container>
    );
}
