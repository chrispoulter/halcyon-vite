import { Layout } from '@/components/layout';
import { HomePage } from '@/home-page';
import { NotFoundPage } from '@/not-found-page';

import { accountRoutes } from '@/features/account/account-routes';
import { profileRoutes } from '@/features/profile/profile-routes';
import { userRoutes } from '@/features/user/user-routes';

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            ...accountRoutes,
            ...profileRoutes,
            ...userRoutes,
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
