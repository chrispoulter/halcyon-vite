import { createContext } from 'react';
import { SessionPayload } from '@/features/auth/auth-types';

type AuthContextType = {
    accessToken: string | null;
    user?: SessionPayload;
    setAuth: (accessToken: string) => void;
    clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    user: undefined,
    setAuth: () => {},
    clearAuth: () => {},
});
