import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import {
    APP_ROUTES,
    USER_ROLE,
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteForbbied,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/consts';
import { AppRoutesPropsType } from '@/shared/types/router';

export const routeConfig: Record<APP_ROUTES, AppRoutesPropsType> = {
    [APP_ROUTES.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [APP_ROUTES.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [APP_ROUTES.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [APP_ROUTES.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [APP_ROUTES.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [APP_ROUTES.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [APP_ROUTES.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [APP_ROUTES.ADMIN_PANEL]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [USER_ROLE.MANAGER, USER_ROLE.ADMIN],
    },
    [APP_ROUTES.FORBIDDEN]: {
        path: getRouteForbbied(),
        element: <ForbiddenPage />,
    },
    // ? Последний маршрут;
    [APP_ROUTES.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
