import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ChangePasswordRequest,
    ChangePasswordResponse,
} from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/api-client';
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

export const useChangePassword = () => {
    const { accessToken } = useSession();

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
