import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    SearchUsersRequest,
    SearchUsersResponse,
} from '@/features/user/user-types';
import { useSession } from '@/hooks/useSession';
import { fetcher } from '@/lib/api-client';
import { config } from '@/lib/config';

export const searchUsers = (
    request: SearchUsersRequest,
    init?: RequestInit
) => {
    const params = Object.entries(request)
        .map((pair) => pair.map(encodeURIComponent).join('='))
        .join('&');

    return fetcher<SearchUsersResponse>(
        `${config.API_URL}/user?${params}`,
        init
    );
};

export const useSearchUsers = (request: SearchUsersRequest) => {
    const { accessToken } = useSession();

    return useQuery({
        queryKey: ['users', request],
        queryFn: () =>
            searchUsers(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        placeholderData: keepPreviousData,
    });
};
