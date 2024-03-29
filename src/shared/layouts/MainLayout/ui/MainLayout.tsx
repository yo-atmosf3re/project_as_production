import React, { ReactElement, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutPropsI {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

/**
 * Главный каркас всего приложения;
 * @param className
 * @param header
 * @param content
 * @param sidebar
 * @param toolbar
 */
export const MainLayout: React.FC<MainLayoutPropsI> = memo(
    ({ className, content, header, sidebar, toolbar }) => {
        return (
            <div className={classNames(cls['main-layout'], {}, [className])}>
                <div className={cls.content}>{content}</div>
                <div className={cls.sidebar}>{sidebar}</div>
                <div className={cls['right-bar']}>
                    <div className={cls.header}>{header}</div>
                    <div className={cls.toolbar}>{toolbar}</div>
                </div>
            </div>
        );
    },
);
