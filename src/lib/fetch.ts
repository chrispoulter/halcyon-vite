export class FetchError extends Error {
    status: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response?: any;

    constructor(status: number, response?: unknown) {
        super('An error has occurred whilst communicating with the server.');
        this.name = 'FetchError';
        this.status = status;
        this.response = response;
    }
}

export async function fetcher<TResponse>(url: string, init?: RequestInit) {
    const result = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    });

    const isJson = result.headers.get('Content-Type')?.includes('json');

    const response: TResponse = isJson ? await result.json() : undefined;

    if (!result.ok) {
        throw new FetchError(result.status, response);
    }

    return response;
}
