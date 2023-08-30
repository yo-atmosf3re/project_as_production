import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Component.module.scss';
import { useTranslation } from 'react-i18next';

interface ComponentPropsI {
   className?: string;
}

export const Component: React.FC<ComponentPropsI> = ({
   className
}) => {
   const { t } = useTranslation();
   return (
      <div className={classNames(cls.component, {}, [className])}>
         {
            t('Привет, мир!')
         }
      </div>
   )
}