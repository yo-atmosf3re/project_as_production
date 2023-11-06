import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollRestoration } from '../getScrollRestoration/getScrollRestoration';

/**
 * Селектор для получения информации о прокрутке по конкретному пути;
 */
export const getScrollRestorationByPath = createSelector(
    getScrollRestoration,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
