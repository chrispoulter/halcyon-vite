import { Link as RouterLink } from 'react-router';
import { Container, Box, Typography, Button } from '@mui/material';

export function NotFoundPage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Not Found
                </Typography>

                <Typography variant="body1">
                    Sorry, the resource you were looking for could not be found.
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
