import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavbarPropsI {
   className?: string;
}

export const Navbar: React.FC<NavbarPropsI> = ({
   className
}) => {
   return (
      <div className={classNames(cls.navbar)}>
         <div className={cls.links}>
            <AppLink
               theme={AppLinkTheme.SECONDARY}
               to={'/'}
               className={cls.mainLink}
            >
               Главная
            </AppLink>
            <AppLink
               theme={AppLinkTheme.SECONDARY}
               to={'/about'}
            >
               О сайте
            </AppLink>
         </div>
      </div>
   )
}