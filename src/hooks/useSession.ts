import { Role } from '@/lib/session';

export function useSession() {
    const accessToken = localStorage.getItem('accessToken');

    function setAccessToken(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
    }

    return {
        accessToken,
        setAccessToken,
        profile: {
            sub: '1',
            given_name: 'System',
            family_name: 'Administrator',
            email: 'system.administrator@example.com',
            role: [Role.SYSTEM_ADMINISTRATOR],
        },
    };
}
