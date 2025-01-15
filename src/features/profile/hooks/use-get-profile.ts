import { useQuery } from '@tanstack/react-query';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

export const getProfile = (init?: RequestInit) =>
    fetcher<GetProfileResponse>(`${config.API_URL}/profile`, init);

export const useGetProfile = () => {
    const { accessToken } = useSession();

    return useQuery({
        queryKey: ['profile'],
        queryFn: () =>
            getProfile({
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
    });
};
