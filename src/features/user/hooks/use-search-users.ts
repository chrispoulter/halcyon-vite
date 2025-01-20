import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    SearchUsersRequest,
    SearchUsersResponse,
} from '@/features/user/user-types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

export const useSearchUsers = (request: SearchUsersRequest) => {
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ['users', request],
        queryFn: () =>
            apiClient.get<SearchUsersResponse>('/user', request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        placeholderData: keepPreviousData,
    });
};
