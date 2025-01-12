import { Box, Typography, Container, Link, Stack } from '@mui/material';

const currentYear = new Date().getFullYear();

export const Footer = () => {
    return (
        <Container maxWidth="sm">
            <Box component="footer">
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
                    <Typography variant="body2">
                        v{import.meta.env.VITE_VERSION}
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
};
