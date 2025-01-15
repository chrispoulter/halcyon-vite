import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ChangePasswordRequest,
    ChangePasswordResponse,
} from '@/features/profile/profile-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const changePassword = (request: ChangePasswordRequest, init?: RequestInit) =>
    fetcher<ChangePasswordResponse>(
        `${config.API_URL}/profile/change-password`,
        {
            ...init,
            method: 'PUT',
            body: JSON.stringify(request),
        }
    );

const accessToken = '1234';

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ChangePasswordRequest) =>
            changePassword(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
