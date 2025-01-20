import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryProvider } from '@/components/query-provider';
import { AuthProvider } from '@/features/auth/context/auth-provider';
import { theme } from '@/theme';
import { routes } from '@/routes';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <AuthProvider>
                <QueryProvider>
                    <RouterProvider router={router} />
                </QueryProvider>
            </AuthProvider>

            <SnackbarProvider
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                }}
            />
        </ThemeProvider>
    </StrictMode>
);
