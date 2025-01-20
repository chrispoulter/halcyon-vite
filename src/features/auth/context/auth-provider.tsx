import { useState } from 'react';
import { decodeJwt } from 'jose';
import { AuthContext } from '@/features/auth/context/auth-context';
import { SessionPayload } from '@/lib/session-types';

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
                user,
            }}
        >
            {children}
        </AuthContext>
    );
};
