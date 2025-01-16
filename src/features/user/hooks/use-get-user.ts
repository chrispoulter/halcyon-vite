import { useQuery } from '@tanstack/react-query';
import { GetUserResponse } from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/api-client';
import { config } from '@/lib/config';

export const getUser = (id: string, init?: RequestInit) =>
    fetcher<GetUserResponse>(`${config.API_URL}/user/${id}`, init);

export const useGetUser = (id: string) => {
    const { accessToken } = useSession();

    return useQuery({
        queryKey: ['user', id],
        queryFn: () =>
            getUser(id, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
    });
};
