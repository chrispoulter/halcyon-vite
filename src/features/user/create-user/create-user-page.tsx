import { Container, Box, Typography } from '@mui/material';

export function CreateUserPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Users
                </Typography>
                <Typography variant="h2" gutterBottom>
                    Create
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Create a new account for a user to access the full range of
                    features available on this site.
                </Typography>
            </Box>
        </Container>
    );
}
