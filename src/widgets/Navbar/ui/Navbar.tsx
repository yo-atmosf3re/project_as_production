import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, BUTTON_THEME } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUsername/ui';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TEXT_THEME } from 'shared/ui/Text';
import { APP_LINK_THEME, AppLink } from 'shared/ui/AppLink';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import { HStack } from 'shared/ui/Stack';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import cls from './Navbar.module.scss';

interface NavbarPropsI {
   className?: string;
}

// ? Компонента-навбар;
export const Navbar: React.FC<NavbarPropsI> = memo(() => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = React.useState(false);
    // ? Авторизационные данные;
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onCloseModal = React.useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = React.useCallback(() => {
        setIsAuthModal(true);
    }, []);

    // ? Функция для логаута, диспатчи тоже мемоизируем;
    const onLogoutModal = React.useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    // ? Такая альтернативная отрисовка вызывается только в том случае, если есть какие-то авторизационные данные у пользователя - пользователь вошёл в аккаунт, как это работает: приложение запускается, в App.tsx отрабатывает useEffect, внутри которого вызывается функция с инициализацией данных пользователя, в LS сохраняется токен пользователя (если его там нет);
    if (authData) {
        return (
            <HStack
                role="heading"
                align="center"
                className={classNames(cls.navbar)}
            >
                <Text
                    theme={TEXT_THEME.INVERTED}
                    className={cls['app-name']}
                    title={
                        t('LOGO')
                    }
                />
                <AppLink
                    className={cls['create-article_button']}
                    to={ROUTES_PATH.article_create}
                    theme={APP_LINK_THEME.SECONDARY}
                >
                    {
                        t('Создать статью')
                    }
                </AppLink>
                <Dropdown
                    direction="bottom left"
                    className={cls.dropdown}
                    items={[
                        {
                            content: t('Профиль'),
                            href: ROUTES_PATH.profile + authData.id,
                        },
                        {
                            content: t('Выйти'),
                            onClick: onLogoutModal,
                        },
                    ]}
                    trigger={(
                        <Avatar
                            size={30}
                            src={authData.avatar}
                        />
                    )}
                />
            </HStack>
        );
    }

    return (
        <HStack
            role="heading"
            align="center"
            className={classNames(cls.navbar)}
        >
            <Button
                className={cls.links}
                theme={BUTTON_THEME.CLEAR_INVERTED}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {
                isAuthModal
                    ? (
                        <LoginModal
                            isOpen={isAuthModal}
                            onClose={onCloseModal}
                        />
                    )
                    : null
            }
        </HStack>
    );
});
