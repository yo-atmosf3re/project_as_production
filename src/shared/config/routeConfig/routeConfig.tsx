import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';

export enum AppRoutes {
   MAIN = 'main',
   ABOUT = 'about'
}

export const routesPath: Record<AppRoutes, string> = {
   [AppRoutes.MAIN]: '/',
   [AppRoutes.ABOUT]: '/about',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
   [AppRoutes.MAIN]: {
      path: routesPath.main,
      element: <MainPage />
   },
   [AppRoutes.ABOUT]: {
      path: routesPath.about,
      element: <AboutPage />
   },
} 