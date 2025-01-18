import { Link as RouterLink } from 'react-router';
import { Container, Box, Typography, Button } from '@mui/material';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { DeleteAccountButton } from '@/features/profile/profile/delete-account-button';
import { toLocaleString } from '@/lib/dates';

export function ProfilePage() {
    const { data: profile } = useGetProfile();

    if (!profile) {
        return null;
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography component="h1" variant="h3">
                    My Account
                </Typography>

                <Typography component="h2" variant="h4">
                    Personal Details
                </Typography>

                <Typography
                    component="dl"
                    variant="body1"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                    <Typography component="dt" variant="body1">
                        Email Address
                    </Typography>
                    <Typography component="dd" variant="body2">
                        {profile.emailAddress}
                    </Typography>
                    <Typography component="dt" variant="body1">
                        Name
                    </Typography>
                    <Typography component="dd" variant="body2">
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography component="dt" variant="body1">
                        Date Of Birth
                    </Typography>
                    <Typography component="dd" variant="body2">
                        {toLocaleString(profile.dateOfBirth)}
                    </Typography>
                </Typography>

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
                        to="/profile/update-profile"
                    >
                        Update Profile
                    </Button>
                </Box>

                <Typography component="h2" variant="h4">
                    Login Details
                </Typography>

                <Typography variant="body1">
                    Choose a strong password and don&apos;t reuse it for other
                    accounts. For security reasons, change your password on a
                    regular basis.
                </Typography>

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
                        to="/profile/change-password"
                    >
                        Change Password
                    </Button>
                </Box>

                <Typography component="h2" variant="h4">
                    Settings
                </Typography>

                <Typography variant="body1">
                    Once you delete your account all of your data and settings
                    will be removed. Please be certain.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                    }}
                >
                    <DeleteAccountButton profile={profile} />
                </Box>
            </Box>
        </Container>
    );
}
