import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';

// ? Объединяем в один тип RoureProps из RRD, добавляем поле authOnly, которое если true, то блокирует роуты;
type AppRoutesPropsType = RouteProps & {
    authOnly?: boolean;
}

export enum APP_ROUTES {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    // ? Последний маршрут;
    NOT_FOUND = 'not_found'
}

// ? Вся настройка и объявление роутов происходит с помощью данного функционала ;
export const ROUTES_PATH: Record<APP_ROUTES, string> = {
    [APP_ROUTES.MAIN]: '/',
    [APP_ROUTES.ABOUT]: '/about',
    [APP_ROUTES.PROFILE]: '/profile',
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
    // ? Последний маршрут;
    [APP_ROUTES.NOT_FOUND]: {
        path: ROUTES_PATH.not_found,
        element: <NotFoundPage />,
    },
};
