import React, { HTMLAttributes, ReactNode } from 'react';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

/**
 * @param normal
 * @param outlined
 * @param light - светлый вариант карточки;
 */
export type CardVariantType = 'normal' | 'outlined' | 'light';

/**
 * Отступы (`padding`), которые будут заданы для карточки;
 */
export type CardPaddingType = '0' | '8' | '16' | '24';

/**
 * Внешний вид карточки - загруглённый или нормальный;
 */
export type CardBorderType = 'round' | 'normal';

const MAP_PADDING_TO_CLASS: Record<CardPaddingType, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

interface CardPropsI extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariantType;
    max?: boolean;
    padding?: CardPaddingType;
    border?: CardBorderType;
}

/**
 * Компонента-карточка, входящая в комплект UI-kit проекта. Стилизует children этой компоненты в подобие блока в виде карточки-блока;
 * @param className
 * @param children
 * @param theme - тема карточки, для доступа используется CARD_THEME enum;
 * @param max - флаг, по которому указывается максимальная ширина для карточки;
 * @returns
 */
export const Card: React.FC<CardPropsI> = ({
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    border = 'normal',
    ...otherProps
}) => {
    const paddingClass = MAP_PADDING_TO_CLASS[padding];
    const mods: ModsType = {
        [cls.max]: max,
    };
    const additionalClasses: Array<string | undefined> = [
        className,
        cls[variant],
        cls[paddingClass],
        cls[border]
    ];
    return (
        <div
            className={classNames(cls.card, mods, additionalClasses)}
            {...otherProps}
        >
            {children}
        </div>
    );
};
