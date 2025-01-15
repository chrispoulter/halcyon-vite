import { useSearchParams } from 'react-router';
import { Container, Box, Typography } from '@mui/material';
import { SearchUserForm } from '@/features/user/search-users/search-user-form';
import { SortUserDropdown } from '@/features/user/search-users/sort-user-dropdown';
import { UserCard } from '@/features/user/search-users/user-card';
import { UserSort } from '../user-types';

export function SearchUsersPage() {
    const [searchParams] = useSearchParams({
        page: '1',
        sort: UserSort.NAME_ASC,
        search: '',
    });

    console.log('searchParams', searchParams);

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Users
                </Typography>

                <SearchUserForm />
                <SortUserDropdown />

                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
            </Box>
        </Container>
    );
}
