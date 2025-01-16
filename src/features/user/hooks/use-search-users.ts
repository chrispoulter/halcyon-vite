import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    SearchUsersRequest,
    SearchUsersResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { apiClient } from '@/lib/api-client';

export const useSearchUsers = (request: SearchUsersRequest) => {
    const { accessToken } = useSession();

    return useQuery({
        queryKey: ['users', request],
        queryFn: () =>
            apiClient.get<SearchUsersResponse>('/user', request, {
                Authorization: `Bearer ${accessToken}`,
            }),
        placeholderData: keepPreviousData,
    });
};
