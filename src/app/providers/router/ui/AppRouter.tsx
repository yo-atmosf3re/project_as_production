import { getUserAuthData } from 'entitites/User';
import React, { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader';

// ? Компонента, которая мапит роуты из routeConfig'a;
const AppRouter = () => {
    // ? Извлекаем значение, которое указывает авторизован пользователь или нет, в переменную;
    const isAuth = useSelector(getUserAuthData);

    // const routes = useMemo(() => Object.values(routeConfig)
    //     .filter(
    //         (route) => {
    //             if (route.authOnly && !isAuth) {
    //                 return false;
    //             }
    //             return true;
    //         },
    //     ), [isAuth]);

    // ? Фильтруем все маршруты, если пользователь не авторизован, то маршрут не попадёт в массив маршрутов;
    const routes = useMemo(() => Object.values(routeConfig)
        .filter(
            (route) => !(route.authOnly && !isAuth),
        ), [isAuth]);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {
                    routes
                        .map(({ element, path }) => (
                            <Route
                                key={path}
                                path={path}
                                element={(
                                    <div className="page-wrapper">
                                        {element}
                                    </div>
                                )}
                            />
                        ))
                }
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
