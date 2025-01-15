import { Link as RouterLink } from 'react-router';
import { Container, Box, Typography, Button } from '@mui/material';

export function ErrorPage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Error
                </Typography>

                <Typography variant="body1">
                    Sorry, something went wrong. Please try again later.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'flex-end',
                        gap: 2,
                    }}
                >
                    <Button variant="contained" component={RouterLink} to="/">
                        Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
