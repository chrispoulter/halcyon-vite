import { Box, Typography, Container, Link } from '@mui/material';
import { config } from '@/lib/config';
import { currentYear } from '@/lib/dates';

export function Footer() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body2">
                    &copy;{' '}
                    <Link href="https://www.chrispoulter.com">
                        Chris Poulter
                    </Link>{' '}
                    {currentYear}
                </Typography>
                <Typography variant="body2">v{config.VERSION}</Typography>
            </Box>
        </Container>
    );
}
