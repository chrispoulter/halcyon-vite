import { useQuery } from '@tanstack/react-query';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';
import { config } from '@/lib/config';

export const useGetProfile = () => {
    const { accessToken } = useSession();

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
