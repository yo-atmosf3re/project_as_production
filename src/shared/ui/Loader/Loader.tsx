import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderPropsI {
   className?: string;
}

// ? Компонента-лоудер;
export const Loader: React.FC<LoaderPropsI> = ({
    className,
}) => (
    <div className={classNames(cls.loader, {}, [className])}>
        <div className={cls['loadingio-spinner-pulse-968omdk8qim']}>
            <div className={cls['ldio-sua4x21xnrr']}>
                <div />
                <div />
                <div />
            </div>
        </div>
    </div>
);