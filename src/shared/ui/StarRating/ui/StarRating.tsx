import React, { memo, useState } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '../../../assets/icons/star.svg';
import { Icon } from '../../Icon';

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
 */
export const StarRating: React.FC<StarRatingPropsI> = memo(({
    className, onSelect,
    size = 30,
    selectedStars = 0,
}) => {
    const [currentStarsCount, setCurrentStarsCount] = useState<number>(selectedStars);
    const [isSelected, setIsSelected] = useState<boolean>(Boolean(selectedStars));

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
            className={classNames(cls['star-rating'], {}, [className])}
        >
            {
                // ? Итерация по представленному массиву с числами, который является т.н рейтингом, где в зависимости от некоторых условий применяются классы, которые отличают выбранные звёзды от невыбранных;
                STARS.map((starNumber) => (
                    <Icon
                        className={classNames(
                            cls['star-icon'],
                            {
                                [cls.selected]: isSelected,
                            },
                            [
                                currentStarsCount >= starNumber
                                    ? cls.hovered
                                    : cls.normal,
                            ],
                        )}
                        Svg={StarIcon}
                        key={starNumber}
                        width={size}
                        height={size}
                        onMouseLeave={onLeaveHandler}
                        onMouseEnter={onHoverHandler(starNumber)}
                        onClick={onClickHandler(starNumber)}
                        data-testid={`StarRating.${starNumber}`}
                        // ? Проверка на количественно выбранных звёзд (для e2e-тестирования);
                        data-selected={currentStarsCount >= starNumber}
                    />
                ))
            }
        </div>
    );
});
