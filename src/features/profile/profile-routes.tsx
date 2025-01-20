import { RouteObject } from 'react-router';
import { RequireAuth } from '@/features/auth/require-auth';
import { ProfilePage } from '@/features/profile/profile/profile-page';
import { UpdateProfilePage } from '@/features/profile/update-profile/update-profile-page';
import { ChangePasswordPage } from '@/features/profile/change-password/change-password-page';

export const profileRoutes: RouteObject[] = [
    {
        path: 'profile',
        element: <RequireAuth />,
        children: [
            { index: true, element: <ProfilePage /> },
            { path: 'update-profile', element: <UpdateProfilePage /> },
            { path: 'change-password', element: <ChangePasswordPage /> },
        ],
    },
];
