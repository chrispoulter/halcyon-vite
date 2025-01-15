import { useQuery } from '@tanstack/react-query';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

export const getProfile = (init?: RequestInit) =>
    fetcher<GetProfileResponse>(`${config.API_URL}/profile`, init);

const accessToken = '1234';

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () =>
            getProfile({
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
    });
};
