import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    UpdateProfileRequest,
    UpdateProfileResponse,
} from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/auth-provider';
import { apiClient } from '@/lib/api-client';

export const useUpdateProfile = () => {
    const { accessToken } = useAuth();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateProfileRequest) =>
            apiClient.put<UpdateProfileResponse>('/profile', request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        },
    });
};
