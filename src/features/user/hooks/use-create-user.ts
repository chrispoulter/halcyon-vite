import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    CreateUserRequest,
    CreateUserResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const createUser = (request: CreateUserRequest, init?: RequestInit) =>
    fetcher<CreateUserResponse>(`${config.API_URL}/user`, {
        ...init,
        method: 'POST',
        body: JSON.stringify(request),
    });

export const useCreateUser = () => {
    const { accessToken } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateUserRequest) =>
            createUser(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};
