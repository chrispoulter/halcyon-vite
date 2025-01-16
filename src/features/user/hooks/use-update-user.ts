import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    UpdateUserRequest,
    UpdateUserResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';

export const useUpdateUser = (id: string) => {
    const { accessToken } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateUserRequest) =>
            apiClient.put<UpdateUserResponse>(`/user/${id}`, request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
