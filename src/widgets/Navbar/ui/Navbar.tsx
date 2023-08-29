import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';

interface NavbarPropsI {
   className?: string;
}

export const Navbar: React.FC<NavbarPropsI> = ({
   className
}) => {
   return (
      <div className={classNames(cls.navbar)}>
         <Link to={'/'}>Главная</Link>
         <Link to={'/about'}>О сайте</Link>
      </div>
   )
}