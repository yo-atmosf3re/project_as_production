import React from 'react';
import { Loader } from 'shared/ui/Loader';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';

interface PageLoaderPropsI {
   className?: string;
}

/**
 * Компонента, являющаяся имплементацией компоненты Loader, которая является страницей-прелоудером;
 * @param className
 */
export const PageLoader: React.FC<PageLoaderPropsI> = ({
    className,
}) => (
    <div className={classNames(cls.pageLoader, {}, [className])}>
        <Loader />
    </div>
);
