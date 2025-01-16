import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ChangePasswordRequest,
    ChangePasswordResponse,
} from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';

export const useChangePassword = () => {
    const { accessToken } = useSession();

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
