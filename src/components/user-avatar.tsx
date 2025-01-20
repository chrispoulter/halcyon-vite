import { Avatar } from '@mui/material';
import { SessionPayload } from '@/lib/session-types';

type UserAvatarProps = {
    user: SessionPayload;
};

export function UserAvatar({ user }: UserAvatarProps) {
    const hashedEmail = '1234';

    return (
        <Avatar
            alt={`${user.given_name} ${user.family_name}`}
            src={`https://www.gravatar.com/avatar/${hashedEmail}?d=404`}
        />
    );
}
