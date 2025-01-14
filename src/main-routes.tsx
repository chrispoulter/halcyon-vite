import { Route, Routes } from 'react-router';

import { Layout } from '@/components/layout';
import { HomePage } from '@/home-page';
import { NotFoundPage } from '@/not-found-page';

import { AccountRoutes } from '@/features/account/account-routes';
import { ProfileRoutes } from '@/features/profile/profile-routes';
import { UserRoutes } from '@/features/user/user-routes';

export function MainRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <AccountRoutes />
                <ProfileRoutes />
                <UserRoutes />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
