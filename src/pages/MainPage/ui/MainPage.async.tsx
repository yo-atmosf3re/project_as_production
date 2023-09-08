import { lazy } from 'react';

// ? Компонента, которая обёрнута в lazy и тестово вызывается слегка позже;
export const MainPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./MainPage')), 1500);
}));
