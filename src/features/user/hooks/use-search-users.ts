import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    SearchUsersRequest,
    SearchUsersResponse,
} from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
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

const accessToken = '1234';

export const useSearchUsers = (request: SearchUsersRequest) => {
    return useQuery({
        queryKey: ['users', request],
        queryFn: () =>
            searchUsers(request, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        placeholderData: keepPreviousData,
    });
};
