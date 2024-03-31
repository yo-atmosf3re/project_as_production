import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayPropsI {
    className?: string;
    onClick?: () => void;
}

/**
 * Компонента, входящая в комполект UI-kit проекта, отвечающая за затемнение `background` модального окна;
 * @param className
 * @param onClick - функция, отвечающая за обработку клика на затемнённый `background`;
 */
export const Overlay: React.FC<OverlayPropsI> = memo(
    ({ className, onClick }) => {
        return (
            <div
                className={classNames(cls.overlay, {}, [className])}
                onClick={onClick}
            />
        );
    },
);
