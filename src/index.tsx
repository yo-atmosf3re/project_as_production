import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. Не удалось вмонтировать React-приложение!',
    );
}

const root = createRoot(container);

// ? Точка входа в приложение (entry point);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <Suspense fallback="">
                        <App />
                    </Suspense>
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
