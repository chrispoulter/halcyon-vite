import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    UnlockUserRequest,
    UnlockUserResponse,
} from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const unlockUser = (
    id: string,
    request: UnlockUserRequest,
    init?: RequestInit
) =>
    fetcher<UnlockUserResponse>(`${config.API_URL}/user/${id}/unlock`, {
        ...init,
        method: 'PUT',
        body: JSON.stringify(request),
    });

const accessToken = '1234';

export const useUnlockUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UnlockUserRequest) =>
            unlockUser(id, request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
