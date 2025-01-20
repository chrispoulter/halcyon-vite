import { useParams } from 'react-router';
import { Container, Box, Typography } from '@mui/material';
import { UpdateUserForm } from '@/features/user/update-user/update-user-form';
import { useGetUser } from '../hooks/use-get-user';

type UpdateUserPageParams = { id: string };

export function UpdateUserPage() {
    const { id } = useParams() as UpdateUserPageParams;

    const { data: user } = useGetUser(id);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Users
                </Typography>

                <Typography component="h2" variant="h4">
                    Update
                </Typography>

                <Typography variant="body1">
                    Update the user&apos;s details below. The email address is
                    used to login to the account.
                </Typography>

                <UpdateUserForm user={user} />
            </Box>
        </Container>
    );
}
