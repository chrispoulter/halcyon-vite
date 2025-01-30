import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/components/query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/features/auth/auth-provider';
import { routes } from '@/routes';

import '@/index.css';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <AuthProvider>
                <QueryProvider>
                    <RouterProvider router={router} />
                </QueryProvider>
            </AuthProvider>
            <Toaster />
        </ThemeProvider>
    </StrictMode>
);
