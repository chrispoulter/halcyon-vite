import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { routes } from '@/routes';
import { FetchError } from './lib/fetch';

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error: Error) => {
            if (error instanceof FetchError) {
                // switch (error.status) {
                //     case 401:
                //         return signOut({
                //             callbackUrl: '/account/login',
                //         });
                //     case 403:
                //         return router.push('/403', router.asPath);
                //     case 404:
                //         return router.push('/404', router.asPath);
                //     default:
                //         return router.push('/500', router.asPath);
                // }
            }

            // return router.push('/500', router.asPath);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: Error) => {
            if (error instanceof FetchError) {
                // const message = error?.response?.title;
                // switch (error.status) {
                //     case 401:
                //         return signOut({
                //             callbackUrl: '/account/login',
                //         });
                //     case 403:
                //         return toast.error(
                //             'Sorry, you do not have access to this resource.'
                //         );
                //     case 404:
                //         return toast.error(
                //             'Sorry, the resource you were looking for could not be found.'
                //         );
                //     default:
                //         return toast.error(
                //             message ||
                //                 'Sorry, something went wrong. Please try again later.'
                //         );
                // }
            }

            // return toast.error(
            //     error.message ||
            //         'Sorry, something went wrong. Please try again later.'
            // );
        },
    }),
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} noSsr>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
);
