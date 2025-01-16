import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    UpdateProfileRequest,
    UpdateProfileResponse,
} from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/api-client';
import { config } from '@/lib/config';

const updateProfile = (request: UpdateProfileRequest, init?: RequestInit) =>
    fetcher<UpdateProfileResponse>(`${config.API_URL}/profile`, {
        ...init,
        method: 'PUT',
        body: JSON.stringify(request),
    });

export const useUpdateProfile = () => {
    const { accessToken } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateProfileRequest) =>
            updateProfile(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
