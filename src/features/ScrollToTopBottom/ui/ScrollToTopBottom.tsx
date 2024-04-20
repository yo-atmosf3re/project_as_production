import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopBottom.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopBottomPropsI {
    className?: string;
}

/**
 * Компонента, которая отрисовывает кнопку, поднимающая скролл на самый верх;
 * @param className
 */
export const ScrollToTopBottom: React.FC<ScrollToTopBottomPropsI> = memo(
    ({ className }) => {
        const onClickHandler = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        return (
            <Icon
                Svg={CircleIcon}
                clickable
                width={32}
                height={32}
                onClick={onClickHandler}
                className={classNames(cls.ScrollToTopBottom, {}, [className])}
            />
        );
    },
);
