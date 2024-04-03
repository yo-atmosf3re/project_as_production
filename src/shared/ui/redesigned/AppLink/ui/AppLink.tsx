import React, { ReactNode, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '../../../../lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkTheme = 'primary' | 'red';

interface AppLinkPropsI extends LinkProps {
    className?: string;
    variant?: AppLinkTheme;
    children?: ReactNode;
}

// ? Мемоизация для AppLink работает и действует по такому же принципу, что и для Button-компоненты;
/**
 * Кастомизированная компонента, входящая в обновлённый комплект UI-kit проекта, для создания ссылок;
 * @param className
 * @param theme - тема ссылки, для доступа используется APP_LINK_THEME enum;
 * @param children
 */
export const AppLink: React.FC<AppLinkPropsI> = memo(
    ({ className, children, variant = 'primary', to, ...otherProps }) => (
        <Link
            to={to}
            className={classNames(cls.appLink, {}, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </Link>
    ),
);