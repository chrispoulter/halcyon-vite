import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LockUserRequest, LockUserResponse } from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const lockUser = (id: string, request: LockUserRequest, init?: RequestInit) =>
    fetcher<LockUserResponse>(`${config.API_URL}/user/${id}/lock`, {
        ...init,
        method: 'PUT',
        body: JSON.stringify(request),
    });

const accessToken = '1234';

export const useLockUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: LockUserRequest) =>
            lockUser(id, request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
