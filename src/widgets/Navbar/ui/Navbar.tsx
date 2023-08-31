import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';

interface NavbarPropsI {
   className?: string;
}

export const Navbar: React.FC<NavbarPropsI> = ({
   className
}) => {

   const { t } = useTranslation('navbar');

   return (
      <div className={classNames(cls.navbar)}>
         <div className={cls.links}>
            <AppLink
               theme={AppLinkTheme.SECONDARY}
               to={'/'}
               className={cls.mainLink}
            >
               {
                  t('glavnya-stranica')
               }
            </AppLink>
            <AppLink
               theme={AppLinkTheme.SECONDARY}
               to={'/about'}
            >
               {
                  t('o-saite')
               }
            </AppLink>
         </div>
      </div>
   )
}