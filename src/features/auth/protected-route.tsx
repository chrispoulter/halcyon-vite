import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Role } from '@/features/auth/auth-types';
import { ForbiddenPage } from '@/forbidden-page';

type ProtectedRouteProps = {
    roles?: Role[];
};

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/account/login" />;
    }

    if (roles && !roles.some((value) => user?.roles?.includes(value))) {
        return <ForbiddenPage />;
    }

    return <Outlet />;
}
