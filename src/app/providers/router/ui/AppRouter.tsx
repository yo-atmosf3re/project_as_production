import { Suspense, memo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutesPropsType, routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

// ? Компонента, которая мапит роуты из routeConfig'a;
const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesPropsType) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (

            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly
                        ? (
                            <RequireAuth
                                roles={route.roles}
                            >
                                {element}
                            </RequireAuth>
                        )
                        : element
                }
            />
        );
    }, []);

    return (
        <Routes>
            {
                Object.values(routeConfig).map(renderWithWrapper)
            }
        </Routes>
    );
};

export default memo(AppRouter);
