import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    DeleteAccountRequst,
    DeleteAccountResponse,
} from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';
import { fetcher as fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const deleteAccount = (request: DeleteAccountRequst, init?: RequestInit) =>
    fetcher<DeleteAccountResponse>(`${config.API_URL}/profile`, {
        ...init,
        method: 'DELETE',
        body: JSON.stringify(request),
    });

export const useDeleteAccount = () => {
    const { accessToken } = useSession();

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
