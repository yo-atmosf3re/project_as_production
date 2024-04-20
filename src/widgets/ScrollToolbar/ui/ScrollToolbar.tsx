import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTopBottom } from '@/features/ScrollToTopBottom';

interface ScrollToolbarPropsI {
    className?: string;
}

/**
 * Компонента, отрисовывающая скролл бар. Позиционирует `ScrollToTopBottom`;
 * @param className
 */
export const ScrollToolbar: React.FC<ScrollToolbarPropsI> = memo(
    ({ className }) => {
        return (
            <VStack
                justify="center"
                align="center"
                max
                className={classNames(cls['scroll-toolbar'], {}, [className])}
            >
                <ScrollToTopBottom />
            </VStack>
        );
    },
);
