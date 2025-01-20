import { useQuery } from '@tanstack/react-query';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { apiClient } from '@/lib/api-client';
import { config } from '@/lib/config';

export const useGetProfile = () => {
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ['profile'],
        queryFn: () =>
            apiClient.get<GetProfileResponse>(
                `${config.API_URL}/profile`,
                undefined,
                {
                    Authorization: `Bearer ${accessToken}`,
                }
            ),
    });
};
