import { useQuery } from '@tanstack/react-query';
import { GetUserResponse } from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

export const getUser = (id: string, init?: RequestInit) =>
    fetcher<GetUserResponse>(`${config.API_URL}/user/${id}`, init);

const accessToken = '1234';

export const useGetUser = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () =>
            getUser(id, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
    });
};
