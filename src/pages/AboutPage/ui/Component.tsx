import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Component.module.scss';

interface ComponentPropsI {
    className?: string;
}

// ? Тестовая компонента;
export const Component: React.FC<ComponentPropsI> = ({
    className,
}) => (
    <div className={classNames(cls.component, {}, [className])} />
);
