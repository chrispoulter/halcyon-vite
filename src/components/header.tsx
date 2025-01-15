import { Link as RouterLink } from 'react-router';
import { AppBar, Box, Container, Typography } from '@mui/material';

export function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h3" component={RouterLink} to="/">
                        Halcyon
                    </Typography>
                </Box>
            </Container>
        </AppBar>
    );
}
