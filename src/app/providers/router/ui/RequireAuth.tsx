import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { getUserAuthData, getUserRoles } from '@/entities/User';
import { ROUTES_PATH, USER_ROLE } from '@/shared/const/consts';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: USER_ROLE[];
}

/**
 * Функция, которая ограничивает доступ к некоторым роутам в зависимости от наличия авторизационных данных, роли пользователя;
 * @param children - содержимое RequireAuth-компоненты, которой оборачивается другая компонента. Дочерний компонент отображается только в случае, если есть авторизационные данные;
 * @param roles - массив с ролями пользователя;
 */
export function RequireAuth({ children, roles }: RequireAuthProps) {
    // ? Данные об авторизации, полученные из селектора;
    const auth = useSelector(getUserAuthData);
    // ? Текущий URL;
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    // ? Сразу кэшируем результаты сравнения;
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            // ? Если roles нет, то возвращается true, припятствий для посещения роута нет;
            return true;
        }

        // ? Если роли всё-таки имеются, то их необходимо сравнить: сравниваем роли из одного массива с ролями из другого, если есть хотя бы одно совпадение, то возвращаем true;
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

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

    // ? При ложном hasRequiredRoles перенаправляет пользователя на страницу с запретом доступа;
    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={ROUTES_PATH.forbidden}
                state={{ from: location }}
                replace
            />
        );
    }

    // ? При наличии auth возвращает children;
    return children;
}
