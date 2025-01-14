import { Container, Box, Typography } from '@mui/material';
import { UpdateUserForm } from '@/features/user/update-user/update-user-form';

export default function UpdateUserPage() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h1" gutterBottom>
                    Users
                </Typography>

                <Typography variant="h2" gutterBottom>
                    Update
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Update the user&apos;s details below. The email address is
                    used to login to the account.
                </Typography>

                <UpdateUserForm />
            </Box>
        </Container>
    );
}
