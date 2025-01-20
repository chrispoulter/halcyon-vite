import { useQuery } from '@tanstack/react-query';
import { GetUserResponse } from '@/features/user/user-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

export const useGetUser = (id: string) => {
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ['user', id],
        queryFn: () =>
            apiClient.get<GetUserResponse>(`/user/${id}`, undefined, {
                Authorization: `Bearer ${accessToken}`,
            }),
    });
};
