import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Component.module.scss';

interface ComponentPropsI {
    className?: string;
}

export const Component: React.FC<ComponentPropsI> = ({
    className
}) => {
    return (
        <div className={classNames(cls.component, {}, [className])}>
        </div>
    )
}