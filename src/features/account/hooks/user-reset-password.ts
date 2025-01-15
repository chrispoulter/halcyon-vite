import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ResetPasswordRequest,
    ResetPasswordResponse,
} from '@/features/account/account-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const resetPassword = (request: ResetPasswordRequest) =>
    fetcher<ResetPasswordResponse>(`${config.API_URL}/account/reset-password`, {
        method: 'PUT',
        body: JSON.stringify(request),
    });

export const useResetPassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
