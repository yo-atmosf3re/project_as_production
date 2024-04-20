import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { APP_ROUTES, AppRouteByPathPattern } from '@/shared/const/consts';

export function useRouteChange() {
    const location = useLocation();

    const [appRoute, setAppRoute] = useState<APP_ROUTES>(APP_ROUTES.MAIN);

    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    return appRoute;
}
