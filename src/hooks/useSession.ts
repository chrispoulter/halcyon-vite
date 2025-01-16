import { Role } from '@/lib/session-types';
import { useState } from 'react';

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

    return {
        accessToken,
        setSession,
        clearSession,
        profile: {
            sub: '1',
            given_name: 'System',
            family_name: 'Administrator',
            email: 'system.administrator@example.com',
            role: [Role.SYSTEM_ADMINISTRATOR],
        },
    };
}
