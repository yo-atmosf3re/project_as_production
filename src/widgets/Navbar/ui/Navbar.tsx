import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarPropsI {
   className?: string;
}

// ? Компонента-навбар;
export const Navbar: React.FC<NavbarPropsI> = ({
    // eslint-disable-next-line no-unused-vars
    className,
}) => {
    const { t } = useTranslation('navbar');

    return (
        <div className={classNames(cls.navbar)}>
            <div className={cls.links} />
        </div>
    );
};
