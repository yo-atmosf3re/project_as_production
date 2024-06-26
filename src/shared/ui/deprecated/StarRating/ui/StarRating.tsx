import React, { memo, useState } from 'react';
import { classNames } from '../../../../lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '../../../../assets/icons/star.svg';
import { Icon as IconDeprecated } from '../../Icon';
import { ToggleFeatures, toggleFeatures } from '../../../../lib/features';
import { Icon } from '../../../redesigned/Icon';

interface StarRatingPropsI {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const STARS: number[] = [1, 2, 3, 4, 5];

/**
 * Компонента, входящая в комплект UI-kit проекта, которая отрисовывает звёздный рейтинг;
 * @param className
 * @param onSelect - коллбэк, который сигнализирует о том на какую звезду нажал пользователь;
 * @param size - размер звёзд;
 * @param selectedStars - значение по-умолчанию, количественно выбранных звёзд;
 * @deprecated используется новые компоненты из папки `redesigned`;
 */
export const StarRating: React.FC<StarRatingPropsI> = memo(
    ({ className, onSelect, size = 30, selectedStars = 0 }) => {
        const [currentStarsCount, setCurrentStarsCount] =
            useState<number>(selectedStars);
        const [isSelected, setIsSelected] = useState<boolean>(
            Boolean(selectedStars),
        );

        // ? Обработчик, срабатывающий при наведении на звезду, и если выбранной звезды нет, то устанавливает счётчик с текущей звездой в нужное значение;
        const onHoverHandler = (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(starsCount);
            }
        };

        // ? Обработчик, срабатывающий при отведении с звезды, и если выбранной звезды нет, то устанавливает счётчик с текущей звездой в нужное значение;
        const onLeaveHandler = () => {
            if (!isSelected) {
                setCurrentStarsCount(0);
            }
        };

        // ? Обработчик, срабатывающий при клике на звезду, устанавливает выбранную звезду в коллбэк для выбора текущей звезды, устанавливает выбранную звезду в состояние с выбранными звёздами, а так же переключает состояние, сигнализирующее о том, что какие-то звёзды были выбраны;
        const onClickHandler = (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarsCount(starsCount);
                setIsSelected(true);
            }
        };

        return (
            <div
                className={classNames(
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => 'rating-redesigned',
                        off: () => 'star-rating',
                    }),
                    {},
                    [className],
                )}
            >
                {
                    // ? Итерация по представленному массиву с числами, который является т.н рейтингом, где в зависимости от некоторых условий применяются классы, которые отличают выбранные звёзды от невыбранных;
                    STARS.map((starNumber) => {
                        const commonProps = {
                            className: classNames(
                                cls['star-icon'],
                                { [cls.selected]: isSelected },
                                [
                                    currentStarsCount >= starNumber
                                        ? cls.hovered
                                        : cls.normal,
                                ],
                            ),
                            Svg: StarIcon,
                            key: starNumber,
                            width: size,
                            height: size,
                            onMouseLeave: onLeaveHandler,
                            onMouseEnter: onHoverHandler(starNumber),
                            onClick: onClickHandler(starNumber),
                            'data-testid': `StarRating.${starNumber}`,
                            'data-selected': currentStarsCount >= starNumber,
                        };

                        return (
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
                                    <Icon
                                        clickable={!isSelected}
                                        {...commonProps}
                                    />
                                }
                                off={<IconDeprecated {...commonProps} />}
                            />
                        );
                    })
                }
            </div>
        );
    },
);
