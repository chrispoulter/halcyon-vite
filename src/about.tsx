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
                    About
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Vist the{' '}
                    <Link component={RouterLink} to="/">
                        Home
                    </Link>{' '}
                    page.
                </Typography>
            </Box>
        </Container>
    );
}
