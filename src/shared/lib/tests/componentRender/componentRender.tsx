/* eslint-disable yo-plugin/layer-imports */
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { THEME } from '@/shared/const/consts';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

export interface ComponentRouteOptionsI {
   route?: string;
   initialState?: DeepPartial<StateSchema>;
   asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
   theme?: THEME;
}

interface TestProviderPropsI {
    children: ReactNode;
    options?: ComponentRouteOptionsI;
}

/**
 * Универсальная функция для e2e-тестирования cypress и для unit-тестирования RTL;
 * @param children
 * @param options - объект с тестовыми данными, которые указываются для вложенной компоненты `children`;
 */
export function TestProvider({
    children, options = {},
}: TestProviderPropsI) {
    const {
        asyncReducers,
        initialState,
        route = '/',
        theme = THEME.JUNGLE,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState}
            >
                <I18nextProvider
                    i18n={i18nForTests}
                >
                    {/* // ? Для e2e-тестирования изолированных компонент; */}
                    <ThemeProvider
                        initialTheme={theme}
                    >
                        <div
                            className={`app ${theme}`}
                        >
                            {
                                children
                            }
                        </div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

// ? Обёртка для i18nextProvider, оборачивает в MemoryRouter, StoreProvider - для подключения RTK-store;
export const componentRender = (
    component: ReactNode,
    options: ComponentRouteOptionsI = {},
) => render(
    <TestProvider
        options={options}
    >
        {
            component
        }
    </TestProvider>,
);
// " MemoryRouter - позволять приложению работать с маршрутами без необходимости менять адресную строку браузера или перезагружать страницу. Он полезен, например, когда требуется создать приложение в среде, где нет реального браузера, или для создания тестов, где работа с адресной строкой не требуется;
// " MemoryRouter сохраняет текущий маршрут и его состояние в памяти, а также позволяет управлять переходами по маршрутам через использование некоторых методов;
// " MemoryRouter является важным инструментом для маршрутизации в React приложениях, особенно в случаях, когда нет возможности использовать реальный браузер или требуется создание тестов;
// " StoreProvider - оборачивает в Provider для тестов, может работать с частью стейта благодаря DeepPartial<>;
