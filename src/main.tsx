import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';

import { Layout } from '@/components/layout';
import Home from '@/home-page';
import NotFound from '@/not-found-page';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme} noSsr>
                <CssBaseline />
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
