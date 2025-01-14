import { Route } from 'react-router';
import { CreateUserPage } from '@/features/user/create-user/create-user-page';
import { SearchUsersPage } from '@/features/user/search-users/search-users-page';
import { UpdateUserPage } from '@/features/user/update-user/update-user-page';

export function UserRoutes() {
    return (
        <Route path="user">
            <Route index element={<SearchUsersPage />} />
            <Route path="create" element={<CreateUserPage />} />
            <Route path=":id" element={<UpdateUserPage />} />
        </Route>
    );
}
