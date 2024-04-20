import { ReactElement } from 'react';
import { APP_ROUTES } from '@/shared/const/consts';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

/**
 * Функция, которая в зависимости от страницы, отрисовывает `ScrollToolbar`;
 */
export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<APP_ROUTES, ReactElement> = {
        [APP_ROUTES.ARTICLES]: <ScrollToolbar />,
        [APP_ROUTES.ARTICLE_DETAILS]: <ScrollToolbar />,
        [APP_ROUTES.MAIN]: <div>123</div>,
        [APP_ROUTES.ABOUT]: <div>123</div>,
    };

    return toolbarByAppRoute[appRoute];
}
