import { Link as RouterLink } from 'react-router';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { SearchUsersResponse } from '@/features/user/user-types';

type UserCardProps = {
    user: SearchUsersResponse['items'][number];
};

export function UserCard({ user }: UserCardProps) {
    return (
        <Card component={RouterLink} to={`/user/${user.id}`}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2">{user.emailAddress}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
