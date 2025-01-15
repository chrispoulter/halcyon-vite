import { Link as RouterLink } from 'react-router';
import { Container, Box, Typography, Stack, Button } from '@mui/material';

export function NotFoundPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography component="h1" variant="h3" gutterBottom>
                    Not Found
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Sorry, the resource you were looking for could not be found.
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
