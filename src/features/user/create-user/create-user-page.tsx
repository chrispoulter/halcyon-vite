import { Container, Box, Typography } from '@mui/material';

export function CreateUserPage() {
    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Users
                </Typography>

                <Typography component="h2" variant="h4">
                    Create
                </Typography>

                <Typography variant="body1">
                    Create a new account for a user to access the full range of
                    features available on this site.
                </Typography>
            </Box>
        </Container>
    );
}
