import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher';

interface NavbarPropsI {
   className?: string;
}

export const Sidebar: React.FC<NavbarPropsI> = ({
   className
}) => {

   const [collapsed, setCollapsed] = React.useState<boolean>(false);

   const onToggleHandler = () => {
      setCollapsed(prev => !prev);
   }

   return (
      <div
         className={classNames(cls.sidebar, { [cls.collapsed]: !collapsed }, [className])}
      >
         <button onClick={onToggleHandler}>
            toggle
         </button>
         <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={cls.lang} />
         </div>
      </div>
   )
}