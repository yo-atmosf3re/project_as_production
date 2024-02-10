import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppImage.module.scss';

interface AppImagePropsI {
    className?: string;
}

/**
 *
 * @param className
 */
export const AppImage: React.FC<AppImagePropsI> = memo(({
    className,
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls.AppImage, {}, [className])}
        >
            AppImage
        </div>
    );
});
