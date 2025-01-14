import { Box, Typography, Container, Link, Stack } from '@mui/material';
import { config } from '@/lib/config';
import { currentYear } from '@/lib/dates';

export function Footer() {
    return (
        <Container maxWidth="sm">
            <Box>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Typography variant="body2">
                        &copy;{' '}
                        <Link href="https://www.chrispoulter.com">
                            Chris Poulter
                        </Link>{' '}
                        {currentYear}
                    </Typography>
                    <Typography variant="body2">v{config.VERSION}</Typography>
                </Stack>
            </Box>
        </Container>
    );
}
