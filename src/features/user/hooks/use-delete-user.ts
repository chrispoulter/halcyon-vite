import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    DeleteUserRequest,
    DeleteUserResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/api-client';
import { config } from '@/lib/config';

const deleteUser = (
    id: string,
    request: DeleteUserRequest,
    init?: RequestInit
) =>
    fetcher<DeleteUserResponse>(`${config.API_URL}/user/${id}`, {
        ...init,
        method: 'DELETE',
        body: JSON.stringify(request),
    });

export const useDeleteUser = (id: string) => {
    const { accessToken } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: DeleteUserRequest) =>
            deleteUser(id, request, {
                headers: { Authorization: `Bearer ${accessToken}` },
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
