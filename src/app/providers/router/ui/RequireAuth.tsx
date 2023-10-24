import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';

/**
 * Функция, которая ограничивает доступ к некоторым роутам в зависимости от наличия авторизационных данных;
 * @param children - содержимое RequireAuth-компоненты, которой оборачивается другая компонента. Дочерний компонент отображается только в случае, если есть авторизационные данные;
 */
export function RequireAuth({ children }: {children: JSX.Element}) {
    // ? Данные об авторизации, полученные из селектора;
    const auth = useSelector(getUserAuthData);
    // ? Текущий URL;
    const location = useLocation();

    // ? При ложном auth перенаправляет пользователя на главную страницу;
    if (!auth) {
        return (
            <Navigate
                to={ROUTES_PATH.main}
                state={{ from: location }}
                replace
            />
        );
    }

    // ? При наличии auth возвращает children;
    return children;
}
