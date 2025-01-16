import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    DeleteUserRequest,
    DeleteUserResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';

export const useDeleteUser = (id: string) => {
    const { accessToken } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: DeleteUserRequest) =>
            apiClient.delete<DeleteUserResponse>(`/user/${id}`, request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });

            queryClient.invalidateQueries({
                queryKey: ['user', data.id],
                refetchType: 'none',
            });
        },
    });
};
