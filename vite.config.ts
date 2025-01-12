import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const base = env.VITE_BASE;
    const port = env.VITE_PORT ? parseInt(env.VITE_PORT) : undefined;

    return {
        base,
        plugins: [react()],
        server: {
            port,
            proxy: {
                '/api': {
                    target: process.env.API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    secure: false,
                },
            },
        },
    };
});
