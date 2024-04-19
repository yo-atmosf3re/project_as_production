import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    BUTTON_THEME,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { getUserAuthData } from '@/entities/User';
import {
    Text as TextDeprecated,
    TEXT_THEME,
} from '@/shared/ui/deprecated/Text';
import {
    APP_LINK_THEME,
    AppLink as AppLinkDeprecated,
} from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { LoginModal } from '@/features/AuthByUsername';
import { getRouteArticleCreate } from '@/shared/const/consts';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

interface NavbarPropsI {
    className?: string;
}

// ? Компонента-навбар;
export const Navbar: React.FC<NavbarPropsI> = memo(({ className }) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
    // ? Авторизационные данные;
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls['navbar-redesigned'],
        off: () => cls.navbar,
    });

    const deprecatedNavbarWithAuthData = (
        <HStack
            role="heading"
            align="center"
            className={classNames(mainClass, {}, [className])}
        >
            <TextDeprecated
                theme={TEXT_THEME.INVERTED}
                className={cls['app-name']}
                title={t('LOGO')}
            />
            <AppLinkDeprecated
                className={cls['create-article_button']}
                to={getRouteArticleCreate()}
                theme={APP_LINK_THEME.SECONDARY}
            >
                {t('Создать статью')}
            </AppLinkDeprecated>
            <HStack
                gap="16"
                className={cls.actions}
            >
                <NotificationButton />
                <AvatarDropdown />
            </HStack>
        </HStack>
    );

    // ? Такая альтернативная отрисовка вызывается только в том случае, если есть какие-то авторизационные данные у пользователя - пользователь вошёл в аккаунт, как это работает: приложение запускается, в App.tsx отрабатывает useEffect, внутри которого вызывается функция с инициализацией данных пользователя, в LS сохраняется токен пользователя (если его там нет);
    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <HStack
                        role="heading"
                        align="center"
                        className={classNames(mainClass, {}, [className])}
                    >
                        <HStack
                            gap="16"
                            className={cls.actions}
                        >
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </HStack>
                }
                off={deprecatedNavbarWithAuthData}
            />
        );
    }

    return (
        <HStack
            role="heading"
            align="center"
            className={classNames(mainClass)}
        >
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button
                        variant="clear"
                        className={cls['links-redesigned']}
                        onClick={onShowModal}
                    >
                        {t('Войти')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        className={cls.links}
                        theme={BUTTON_THEME.CLEAR_INVERTED}
                        onClick={onShowModal}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                }
            />
            {isAuthModal ? (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            ) : null}
        </HStack>
    );
});
