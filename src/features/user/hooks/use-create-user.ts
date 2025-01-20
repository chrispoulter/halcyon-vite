import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    CreateUserRequest,
    CreateUserResponse,
} from '@/features/user/user-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

export const useCreateUser = () => {
    const { accessToken } = useAuth();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateUserRequest) =>
            apiClient.post<CreateUserResponse>('/user', request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};
