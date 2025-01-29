import { useQuery } from '@tanstack/react-query';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/auth-provider';
import { apiClient } from '@/lib/api-client';

export const useGetProfile = () => {
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ['profile'],
        queryFn: () =>
            apiClient.get<GetProfileResponse>('/profile', undefined, {
                Authorization: `Bearer ${accessToken}`,
            }),
    });
};
