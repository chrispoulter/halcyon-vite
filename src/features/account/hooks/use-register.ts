import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    RegisterRequest,
    RegisterResponse,
} from '@/features/account/account-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const register = (request: RegisterRequest) =>
    fetcher<RegisterResponse>(`${config.API_URL}/account/register`, {
        method: 'POST',
        body: JSON.stringify(request),
    });

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    });
};
