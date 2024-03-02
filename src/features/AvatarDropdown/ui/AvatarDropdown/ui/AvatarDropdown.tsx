import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Avatar } from '@/shared/ui/Avatar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import {
    isUserAdmin,
    isUserManager,
    userActions,
    getUserAuthData,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AvatarDropdown.module.scss';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/consts';

interface AvatarDropdownPropsI {
    className?: string;
}

/**
 * Компонента, имплементирующая отрисовку `Dropdown`
 * @param className
 */
export const AvatarDropdown: React.FC<AvatarDropdownPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('avatarDropdown');

    const dispatch = useAppDispatch();

    // ? Авторизационные данные;
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvailable = isAdmin || isManager;

    // ? Функция для логаута, диспатчи тоже мемоизируем;
    const onLogoutModal = React.useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            className={classNames(cls['avatar-dropdown'], {}, [className])}
            direction="bottom left"
            items={[
                // ? Разворачиваем массив по условию: если true то переход на панель отображаться будет, а иначе развернётся пустой массив;
                ...(isAdminPanelAvailable
                    ? [
                          {
                              content: t('Админка'),
                              href: getRouteAdminPanel(),
                          },
                      ]
                    : []),
                {
                    content: t('Профиль'),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t('Выйти'),
                    onClick: onLogoutModal,
                },
            ]}
            trigger={
                <Avatar
                    size={30}
                    src={authData.avatar}
                    fallbackInverted
                />
            }
        />
    );
};
