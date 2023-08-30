import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
   PRIMARY = 'primary',
   SECONDARY = 'secondary'
}

interface AppLinkPropsI extends LinkProps {
   className?: string;
   theme?: AppLinkTheme;
}

export const AppLink: React.FC<AppLinkPropsI> = ({
   className, children, theme = AppLinkTheme.PRIMARY, ...otherProps
}) => {
   return (
      <Link
         to={otherProps.to}
         className={classNames(cls.appLink, {}, [className, cls[theme]])}
      >
         {children}
      </Link>
   )
}