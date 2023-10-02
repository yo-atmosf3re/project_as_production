/* eslint-disable max-len, i18next/no-literal-string, @typescript-eslint/no-unused-vars */
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/AuthByUsername/ui';
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

    const onCloseModal = React.useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = React.useCallback(() => {
        setIsAuthModal(true);
    }, []);

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
