import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    UpdateUserRequest,
    UpdateUserResponse,
} from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const updateUser = (
    id: string,
    request: UpdateUserRequest,
    init?: RequestInit
) =>
    fetcher<UpdateUserResponse>(`${config.API_URL}/user/${id}`, {
        ...init,
        method: 'PUT',
        body: JSON.stringify(request),
    });

const accessToken = '1234';

export const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateUserRequest) =>
            updateUser(id, request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
