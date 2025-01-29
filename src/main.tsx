import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryProvider } from '@/components/query-provider';
import { AuthProvider } from '@/features/auth/auth-provider';
import { routes } from '@/routes';

import '@/index.css';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <QueryProvider>
                <RouterProvider router={router} />
            </QueryProvider>
        </AuthProvider>
    </StrictMode>
);
