import { lazy } from 'react';

// ? Компонента, которая обёрнута в lazy и тестово вызывается слегка позже;
export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./ArticlesPage')), 400);
}));
