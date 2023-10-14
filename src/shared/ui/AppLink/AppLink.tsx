import React, { ReactNode, memo } from 'react';
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
   children?: ReactNode;
}

// ? Кастомизированная компонента для создания ссылок;
// ? Мемоизация для AppLink работает и действует по такому же принципу, что и для Button-компоненты, поэтому можно смело добавлять сюда memo;
export const AppLink: React.FC<AppLinkPropsI> = memo(({
    className, children, theme = APP_LINK_THEME.PRIMARY, ...otherProps
}) => (
    <Link
        to={otherProps.to}
        className={classNames(cls.appLink, {}, [className, cls[theme]])}
    >
        {children}
    </Link>
));
