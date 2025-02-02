import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/auth-provider';

export function LogoutRedirect() {
    const { clearAuth } = useAuth();

    const queryClient = useQueryClient();

    useEffect(() => {
        clearAuth();
        queryClient.clear();
    }, [clearAuth, queryClient]);

    return <Navigate to="/account/login" />;
}
