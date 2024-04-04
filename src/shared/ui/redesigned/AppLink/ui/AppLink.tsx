import React, { ReactNode, memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '../../../../lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkTheme = 'primary' | 'red';

interface AppLinkPropsI extends LinkProps {
    className?: string;
    variant?: AppLinkTheme;
    children?: ReactNode;
    activeClassName?: string;
}

// ? Мемоизация для AppLink работает и действует по такому же принципу, что и для Button-компоненты;
/**
 * Кастомизированная компонента, входящая в обновлённый комплект UI-kit проекта, для создания ссылок;
 * @param className
 * @param theme - тема ссылки, для доступа используется AppLinkTheme;
 * @param children
 */
export const AppLink: React.FC<AppLinkPropsI> = memo(
    ({ className, children, variant = 'primary', activeClassName = '', to, ...otherProps }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.appLink, {[activeClassName]: isActive}, [className, cls[variant]])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    ),
);
