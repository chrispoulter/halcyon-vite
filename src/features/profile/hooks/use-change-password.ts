import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ChangePasswordRequest,
    ChangePasswordResponse,
} from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

export const useChangePassword = () => {
    const { accessToken } = useAuth();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ChangePasswordRequest) =>
            apiClient.put<ChangePasswordResponse>(
                '/profile/change-password',
                request,
                {
                    Authorization: `Bearer ${accessToken}`,
                }
            ),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
