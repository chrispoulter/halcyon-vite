import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '@/features/account/account-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const login = (request: LoginRequest) =>
    fetcher<LoginResponse>(`${config.API_URL}/account/login`, {
        method: 'POST',
        body: JSON.stringify(request),
    });

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};
