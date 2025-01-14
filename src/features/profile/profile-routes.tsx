import { Route } from 'react-router';

import { ProfilePage } from '@/features/profile/profile/profile-page';
import { UpdateProfilePage } from '@/features/profile/update-profile/update-profile-page';
import { ChangePasswordPage } from '@/features/profile/change-password/change-password-page';

export function ProfileRoutes() {
    return (
        <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="update-profile" element={<UpdateProfilePage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
    );
}
