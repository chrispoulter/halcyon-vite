import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { MainRoutes } from '@/main-routes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme} noSsr>
                <CssBaseline />
                <MainRoutes />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
