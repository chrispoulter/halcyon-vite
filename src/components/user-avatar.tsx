import { Avatar } from '@mui/material';
import md5 from 'md5';
import { SessionPayload } from '@/features/auth/auth-types';

type UserAvatarProps = {
    user: SessionPayload;
};

export function UserAvatar({ user }: UserAvatarProps) {
    const hashedEmail = md5(user.email.trim().toLowerCase());

    return (
        <Avatar
            alt={`${user.given_name} ${user.family_name}`}
            src={`https://www.gravatar.com/avatar/${hashedEmail}?d=404`}
        />
    );
}
