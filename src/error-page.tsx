import { Link as RouterLink } from 'react-router';
import { Container, Box, Typography, Stack, Button } from '@mui/material';

export function ErrorPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Error
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Sorry, something went wrong. Please try again later.
                </Typography>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" component={RouterLink} to="/">
                        Home
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
