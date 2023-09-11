import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
   RED = 'red'
}

interface AppLinkPropsI extends LinkProps {
   className?: string;
   theme?: AppLinkTheme;
}

// ? Кастомизированная компонента для создания ссылок;
export const AppLink: React.FC<AppLinkPropsI> = ({
    className, children, theme = AppLinkTheme.PRIMARY, ...otherProps
}) => (
    <Link
        to={otherProps.to}
        className={classNames(cls.appLink, {}, [className, cls[theme]])}
    >
        {children}
    </Link>
);
