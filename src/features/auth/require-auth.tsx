import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Role } from '@/lib/session-types';
import { ForbiddenPage } from '@/forbidden-page';

type RequireAuthProps = {
    roles?: Role[];
};

export function RequireAuth({ roles }: RequireAuthProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/account/login" />;
    }

    if (roles && !roles.some((value) => user?.roles?.includes(value))) {
        return <ForbiddenPage />;
    }

    return <Outlet />;
}
