import { Suspense, memo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutesPropsType, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

// ? Компонента, которая мапит роуты из routeConfig'a;
const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesPropsType) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">
                    {route.element}
                </div>
            </Suspense>
        );
        return (

            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly
                        ? <RequireAuth>{element}</RequireAuth>
                        : element
                }
            />
        );
    }, []);

    return (
        // <Suspense fallback={<PageLoader />}>
        //     <Routes>
        //         {
        //             Object.values(routeConfig).map(renderWithWrapper)
        //         }
        //     </Routes>
        // </Suspense>
        <Routes>
            {
                Object.values(routeConfig).map(renderWithWrapper)
            }
        </Routes>
    );
};

export default memo(AppRouter);
