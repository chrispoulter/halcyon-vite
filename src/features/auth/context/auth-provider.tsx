import { useState } from 'react';
import { decodeJwt } from 'jose';
import { AuthContext } from '@/features/auth/context/auth-context';
import { SessionPayload } from '@/features/auth/auth-types';

type AuthProviderProps = {
    children: React.ReactNode;
};

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

    return (
        <AuthContext
            value={{
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
            }}
        >
            {children}
        </AuthContext>
    );
};
