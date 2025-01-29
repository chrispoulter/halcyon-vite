import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

export function Layout() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Header />
            <Outlet />
            <Footer />
            <Toaster />
        </ThemeProvider>
    );
}
