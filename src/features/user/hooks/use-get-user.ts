import { useQuery } from '@tanstack/react-query';
import { GetUserResponse } from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';

export const useGetUser = (id: string) => {
    const { accessToken } = useSession();

    return useQuery({
        queryKey: ['user', id],
        queryFn: () =>
            apiClient.get<GetUserResponse>(`/user/${id}`, undefined, {
                Authorization: `Bearer ${accessToken}`,
            }),
    });
};
