import React, { HTMLAttributes, ReactNode } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

/**
 * @param normal - обычная карточка - красивая, объёмная;
 * @param outlined - минималистичный стиль для карточки: отсутствует задний фон, добавлена обводка;
 */
export enum CARD_THEME {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface CardPropsI extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CARD_THEME;
}

/**
 * Компонента-карточка, входящая в комплект UI-kit проекта. Стилизует children этой компоненты в подобие блока в виде карточки-блока;
 * @param className
 * @param children
 * @param theme - тема карточки, для доступа используется CARD_THEME enum;
 * @returns
 */
export const Card: React.FC<CardPropsI> = ({
    className, children, theme = CARD_THEME.NORMAL, ...otherProps
}) => {
    const mods: ModsType = {};
    const additionalClasses: Array<string | undefined> = [
        className,
        cls[theme],
    ];
    return (
        <div
            className={classNames(cls.card, mods, additionalClasses)}
            {...otherProps}
        >
            {
                children
            }
        </div>
    );
};
