import React, { HTMLAttributes, ReactNode } from 'react';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

/**
 * @param normal - обычная карточка - красивая, объёмная;
 * @param outlined - минималистичный стиль для карточки: отсутствует задний фон, добавлена обводка;
 */
export enum CARD_THEME {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardPropsI extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CARD_THEME;
    max?: boolean;
}

/**
 * Компонента-карточка, входящая в комплект UI-kit проекта. Стилизует children этой компоненты в подобие блока в виде карточки-блока;
 * @param className
 * @param children
 * @param theme - тема карточки, для доступа используется CARD_THEME enum;
 * @param max - флаг, по которому указывается максимальная ширина для карточки;
 * @deprecated используется новые компоненты из папки `redesigned`;
 * @returns
 */
export const Card: React.FC<CardPropsI> = ({
    className,
    children,
    theme = CARD_THEME.NORMAL,
    max,
    ...otherProps
}) => {
    const mods: ModsType = {
        [cls.max]: max,
    };
    const additionalClasses: Array<string | undefined> = [
        className,
        cls[theme],
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
