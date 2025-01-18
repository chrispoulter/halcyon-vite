import { useSearchParams, Link as RouterLink } from 'react-router';
import { z } from 'zod';
import { Container, Box, Typography, Button } from '@mui/material';
import { useSearchUsers } from '@/features/user/hooks/use-search-users';
import { SearchUserForm } from '@/features/user/search-users/search-user-form';
import { SortUserDropdown } from '@/features/user/search-users/sort-user-dropdown';
import { UserCard } from '@/features/user/search-users/user-card';
import { UserSort } from '@/features/user/user-types';

const searchParamsSchema = z.object({
    search: z.string({ message: 'Search must be a valid string' }).catch(''),
    page: z.coerce
        .number({ message: 'Page must be a valid number' })
        .int('Page must be a valid integer')
        .positive('Page must be a postive number')
        .catch(1),
    sort: z
        .nativeEnum(UserSort, {
            message: 'Sort must be a valid user sort',
        })
        .catch(UserSort.NAME_ASC),
});

const PAGE_SIZE = 10;

export function SearchUsersPage() {
    const [searchParams] = useSearchParams({
        page: '1',
        sort: UserSort.NAME_ASC,
        search: '',
    });

    const request = searchParamsSchema.parse(searchParams);

    const { data: users } = useSearchUsers({ ...request, size: PAGE_SIZE });

    if (!users) {
        return null;
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    Users
                </Typography>

                <SearchUserForm />
                <SortUserDropdown />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                    }}
                >
                    <Button
                        component={RouterLink}
                        variant="contained"
                        to="/user/create"
                    >
                        Create New
                    </Button>
                </Box>

                {users.items?.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </Box>
        </Container>
    );
}
