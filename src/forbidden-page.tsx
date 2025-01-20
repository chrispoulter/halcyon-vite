import { Link as RouterLink } from 'react-router';
import { Container, Box, Typography, Button } from '@mui/material';

export function ForbiddenPage() {
    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Forbidden
                </Typography>

                <Typography variant="body1">
                    Sorry, you do not have access to this resource.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
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
