import { Link as RouterLink } from 'react-router';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Typography,
} from '@mui/material';
import { SearchUsersResponse } from '@/features/user/user-types';
import { roles } from '@/lib/session-types';

type UserCardProps = {
    user: SearchUsersResponse['items'][number];
};

export function UserCard({ user }: UserCardProps) {
    return (
        <Card component={RouterLink} to={`/user/${user.id}`}>
            <CardActionArea>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="h6">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2">{user.emailAddress}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 1,
                        }}
                    >
                        {user.isLockedOut && (
                            <Chip
                                variant="outlined"
                                color="error"
                                label="Locked"
                            />
                        )}
                        {user.roles?.map((role) => (
                            <Chip
                                key={role}
                                variant="outlined"
                                label={roles[role].title}
                            />
                        ))}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
