import { RouteObject } from 'react-router';
import { Role } from '@/features/auth/auth-types';
import { RequireAuth } from '@/features/auth/require-auth';
import { CreateUserPage } from '@/features/user/create-user/create-user-page';
import { SearchUsersPage } from '@/features/user/search-users/search-users-page';
import { UpdateUserPage } from '@/features/user/update-user/update-user-page';

export const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: (
            <RequireAuth
                roles={[Role.SYSTEM_ADMINISTRATOR, Role.USER_ADMINISTRATOR]}
            />
        ),
        children: [
            { index: true, element: <SearchUsersPage /> },
            { path: 'create', element: <CreateUserPage /> },
            { path: ':id', element: <UpdateUserPage /> },
        ],
    },
];
