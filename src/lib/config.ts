import packageJson from '@/../package.json';

export const config = {
    VERSION: packageJson.version,
    API_URL: import.meta.env.VITE_API_URL,
};
