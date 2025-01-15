import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    DeleteAccountRequst,
    DeleteAccountResponse,
} from '@/features/profile/profile-types';
import { fetcher as fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const deleteAccount = (request: DeleteAccountRequst, init?: RequestInit) =>
    fetcher<DeleteAccountResponse>(`${config.API_URL}/profile`, {
        ...init,
        method: 'DELETE',
        body: JSON.stringify(request),
    });

const accessToken = '1234';

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: DeleteAccountRequst) =>
            deleteAccount(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['profile'],
                refetchType: 'none',
            });

            queryClient.invalidateQueries({
                queryKey: ['user', data.id],
                refetchType: 'none',
            });
        },
    });
};
