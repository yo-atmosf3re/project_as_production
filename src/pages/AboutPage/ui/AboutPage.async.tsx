import { lazy } from 'react';

// ? Компонента, которая обёрнута в lazy и тестово вызывается слегка позже;
export const AboutPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AboutPage')), 1500);
}));
