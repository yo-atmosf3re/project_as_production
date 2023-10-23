import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';

// ? Объединяем в один тип RoureProps из RRD, добавляем поле authOnly, которое если true, то блокирует роуты;
export type AppRoutesPropsType = RouteProps & {
    authOnly?: boolean;
}

export enum APP_ROUTES {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    // ? Последний маршрут;
    NOT_FOUND = 'not_found'
}

// ? Вся настройка и объявление роутов происходит с помощью данного функционала ;
export const ROUTES_PATH: Record<APP_ROUTES, string> = {
    [APP_ROUTES.MAIN]: '/',
    [APP_ROUTES.ABOUT]: '/about',
    [APP_ROUTES.PROFILE]: '/profile',
    [APP_ROUTES.ARTICLES]: '/articles',
    [APP_ROUTES.ARTICLE_DETAILS]: '/articles/', // ! Сюда ещё + :id, но id будет в routeConfig'e;
    // ? Последний маршрут;
    [APP_ROUTES.NOT_FOUND]: '*',
};

export const routeConfig: Record<APP_ROUTES, AppRoutesPropsType> = {
    [APP_ROUTES.MAIN]: {
        path: ROUTES_PATH.main,
        element: <MainPage />,
    },
    [APP_ROUTES.ABOUT]: {
        path: ROUTES_PATH.about,
        element: <AboutPage />,
    },
    [APP_ROUTES.PROFILE]: {
        path: ROUTES_PATH.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [APP_ROUTES.ARTICLES]: {
        path: ROUTES_PATH.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [APP_ROUTES.ARTICLE_DETAILS]: {
        path: `${ROUTES_PATH.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    // ? Последний маршрут;
    [APP_ROUTES.NOT_FOUND]: {
        path: ROUTES_PATH.not_found,
        element: <NotFoundPage />,
    },
};
