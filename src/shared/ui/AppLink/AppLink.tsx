import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';

export enum APP_LINK_THEME {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
   RED = 'red'
}

interface AppLinkPropsI extends LinkProps {
   className?: string;
   theme?: APP_LINK_THEME;
}

// ? Кастомизированная компонента для создания ссылок;
export const AppLink: React.FC<AppLinkPropsI> = ({
    className, children, theme = APP_LINK_THEME.PRIMARY, ...otherProps
}) => (
    <Link
        to={otherProps.to}
        className={classNames(cls.appLink, {}, [className, cls[theme]])}
    >
        {children}
    </Link>
);
