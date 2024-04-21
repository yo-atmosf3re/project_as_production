import { useJsonSettings } from '@/entities/User';
import ThemeProvider from './ThemeProvider';

/**
 * HOC, который оборачивает `Component` в тематический провайдер, передаёт в этот провайдер тему из JSON-settings;
 * @param Component
 */
export const withTheme = (Component: React.ComponentType) => {
    return () => {
        const { theme: defaultTheme } = useJsonSettings();
        return (
            <ThemeProvider initialTheme={defaultTheme}>
                <Component />
            </ThemeProvider>
        );
    };
};
