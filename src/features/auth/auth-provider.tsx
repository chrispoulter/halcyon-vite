import { createContext, useContext, useState } from 'react';
import { decodeJwt } from 'jose';
import { SessionPayload } from '@/features/auth/auth-types';

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthProviderState = {
    accessToken: string | null;
    user?: SessionPayload;
    setAuth: (accessToken: string) => void;
    clearAuth: () => void;
};

const initialState: AuthProviderState = {
    accessToken: null,
    user: undefined,
    setAuth: () => {},
    clearAuth: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem('accessToken')
    );

    function setAuth(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);
    }

    function clearAuth() {
        localStorage.removeItem('accessToken');
        setAccessToken(null);
    }

    const user = accessToken
        ? decodeJwt<SessionPayload>(accessToken)
        : undefined;

    const value = {
        accessToken,
        setAuth,
        clearAuth,
        user: user
            ? {
                  ...user,
                  roles:
                      typeof user.roles === 'string'
                          ? [user.roles]
                          : user.roles || [],
              }
            : undefined,
    };

    return <AuthProviderContext value={value}>{children}</AuthProviderContext>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthProviderContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
