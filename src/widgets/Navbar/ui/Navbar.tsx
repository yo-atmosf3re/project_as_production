/* eslint-disable max-len, i18next/no-literal-string, @typescript-eslint/no-unused-vars */
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/AuthByUsername/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entitites/User';
import cls from './Navbar.module.scss';

interface NavbarPropsI {
   className?: string;
}

// ? Компонента-навбар;
export const Navbar: React.FC<NavbarPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = React.useState(false);
    // ? Авторизационные данные;
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

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
            <div className={classNames(cls.navbar)}>
                <Button
                    className={cls.links}
                    theme={BUTTON_THEME.CLEAR_INVERTED}
                    onClick={onLogoutModal}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.navbar)}>
            <Button
                className={cls.links}
                theme={BUTTON_THEME.CLEAR_INVERTED}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />
        </div>
    );
};
