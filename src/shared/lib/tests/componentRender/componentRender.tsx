import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export interface ComponentRouteOptions {
   route?: string;
   initialState?: DeepPartial<StateSchema>;
}

// ? Обёртка для i18nextProvider, оборачивает в MemoryRouter, StoreProvider - для подключения RTK-store;
export const componentRender = (component: ReactNode, {
    route = '/',
    initialState,
}: ComponentRouteOptions = {}) => render(
    <StoreProvider initialState={initialState}>
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider
                i18n={i18nForTests}
            >
                {
                    component
                }
            </I18nextProvider>
        </MemoryRouter>
    </StoreProvider>
    ,
);
// " MemoryRouter - позволять приложению работать с маршрутами без необходимости менять адресную строку браузера или перезагружать страницу. Он полезен, например, когда требуется создать приложение в среде, где нет реального браузера, или для создания тестов, где работа с адресной строкой не требуется;
// " MemoryRouter сохраняет текущий маршрут и его состояние в памяти, а также позволяет управлять переходами по маршрутам через использование некоторых методов;
// " MemoryRouter является важным инструментом для маршрутизации в React приложениях, особенно в случаях, когда нет возможности использовать реальный браузер или требуется создание тестов;
// " StoreProvider - оборачивает в Provider для тестов, может работать с частью стейта благодаря DeepPartial<>;
