import { Link as RouterLink } from 'react-router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

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
