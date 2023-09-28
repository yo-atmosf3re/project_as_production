import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import App from './app/App';
import 'shared/config/i18n/i18n';
// eslint-disable-next-line import/order
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import 'app/styles/index.scss';

// ? Точка входа в приложение (entry point);
render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
