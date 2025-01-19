import { version } from '@/../package.json';

export const config = {
    VERSION: version,
    API_URL: import.meta.env.VITE_API_URL,
};
