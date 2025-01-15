import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    UpdateProfileRequest,
    UpdateProfileResponse,
} from '@/features/profile/profile-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

const updateProfile = (request: UpdateProfileRequest, init?: RequestInit) =>
    fetcher<UpdateProfileResponse>(`${config.API_URL}/profile`, {
        ...init,
        method: 'PUT',
        body: JSON.stringify(request),
    });

const accessToken = '1234';

export const useUpdateProfile = () => {
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
