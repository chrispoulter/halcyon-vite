import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from '@/hooks/use-toast';
import { ApiClientError } from '@/lib/api-client';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error: Error) => {
            if (error instanceof ApiClientError) {
                // switch (error.status) {
                //     case 401:
                //         return signOut({
                //             callbackUrl: '/account/login',
                //         });
                //     case 403:
                //         return navigate('/403', router.asPath);
                //     case 404:
                //         return navigate('/404', router.asPath);
                //     default:
                //         return navigate('/500', router.asPath);
                // }
            }

            // return navigate('/500', router.asPath);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: Error) => {
            if (error instanceof ApiClientError) {
                switch (error.status) {
                    // case 401:
                    // return signOut({
                    //     callbackUrl: '/account/login',
                    // });

                    case 403:
                        return toast({
                            variant: 'destructive',
                            title: 'Error',
                            description:
                                'Sorry, you do not have access to this resource.',
                        });

                    case 404:
                        return toast({
                            variant: 'destructive',
                            title: 'Error',
                            description:
                                'Sorry, the resource you were looking for could not be found.',
                        });

                    default:
                        return toast({
                            variant: 'destructive',
                            title: 'Error',
                            description:
                                'Sorry, something went wrong. Please try again later.',
                        });
                }
            }

            return toast({
                variant: 'destructive',
                title: 'Error',
                description:
                    'Sorry, something went wrong. Please try again later.',
            });
        },
    }),
});

type QueryProviderProps = {
    children: React.ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
