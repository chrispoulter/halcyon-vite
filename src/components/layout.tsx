import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function Layout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
}
