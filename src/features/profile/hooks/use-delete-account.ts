import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    DeleteAccountRequst,
    DeleteAccountResponse,
} from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

export const useDeleteAccount = () => {
    const { accessToken } = useAuth();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: DeleteAccountRequst) =>
            apiClient.delete<DeleteAccountResponse>('/profile', request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['profile'],
                refetchType: 'none',
            });

            queryClient.invalidateQueries({
                queryKey: ['user', data.id],
                refetchType: 'none',
            });
        },
    });
};
