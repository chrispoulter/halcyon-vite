import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    CreateUserRequest,
    CreateUserResponse,
} from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const createUser = (request: CreateUserRequest, init?: RequestInit) =>
    fetcher<CreateUserResponse>(`${config.API_URL}/user`, {
        ...init,
        method: 'POST',
        body: JSON.stringify(request),
    });

const accessToken = '1234';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateUserRequest) =>
            createUser(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};
