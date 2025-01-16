import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    CreateUserRequest,
    CreateUserResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';

export const useCreateUser = () => {
    const { accessToken } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateUserRequest) =>
            apiClient.post<CreateUserResponse>('/user', request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};
