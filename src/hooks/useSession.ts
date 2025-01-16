import { useState } from 'react';
import { decodeJwt } from 'jose';
import { Role } from '@/lib/session-types';

type SessionPayload = {
    accessToken: string;
    sub: string;
    email: string;
    given_name: string;
    family_name: string;
    roles?: Role[];
    exp: number;
};

export function useSession() {
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem('accessToken')
    );

    function setSession(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);
    }

    function clearSession() {
        localStorage.removeItem('accessToken');
        setAccessToken(null);
    }

    const user = accessToken
        ? decodeJwt<SessionPayload>(accessToken)
        : undefined;

    return {
        accessToken,
        setSession,
        clearSession,
        user,
    };
}
