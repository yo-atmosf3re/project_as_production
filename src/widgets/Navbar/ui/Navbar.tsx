import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, BUTTON_THEME } from '@/shared/ui/Button';
import {
    getUserAuthData,
} from '@/entities/User';
import { Text, TEXT_THEME } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { ROUTES_PATH } from '@/shared/const/consts';
import { HStack } from '@/shared/ui/Stack';
import { APP_LINK_THEME } from '@/shared/ui/AppLink/ui/AppLink';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { LoginModal } from '@/features/AuthByUsername';

interface NavbarPropsI {
   className?: string;
}

// ? Компонента-навбар;
export const Navbar: React.FC<NavbarPropsI> = memo(() => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = React.useState(false);
    // ? Авторизационные данные;
    const authData = useSelector(getUserAuthData);

    const onCloseModal = React.useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = React.useCallback(() => {
        setIsAuthModal(true);
    }, []);

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
                <HStack
                    gap="16"
                    className={cls.actions}
                >
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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
