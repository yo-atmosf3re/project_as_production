import React, { memo } from 'react';
import { ModsType, classNames } from '../../../lib/classNames/classNames';
import cls from './Text.module.scss';

/**
 * Цветовые темы для текста;
 * @param PRIMARY - text - использует secondary-color, title - использует primary-color;
 * @param INVERTED - text - использует inverted-secondary-color, title - использует inverted-primary-color;
 * @param ERROR - text - тёмно-красный, title - светло-красный;
 */
export enum TEXT_THEME {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error'
}

/**
 * Направление текста;
 */
export enum TEXT_ALIGN {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

/**
 * Размер текста;
 * @param S - text - 12px, title - 16px;
 * @param M - text - 16px, title - 24px;
 * @param L - text - 24px, title - 32px;
 */
export enum TEXT_SIZE {
    S = 'size-s',
    M = 'size-m',
    L = 'size-l',
}

interface TextPropsI {
    className?: string;
    title?: string;
    text?: string;
    theme?: TEXT_THEME;
    align?: TEXT_ALIGN;
    size?: TEXT_SIZE;
}

export type HeaderTagType = 'h1' | 'h2' | 'h3';

// ? Маппер для сопоставления размера шрифта с HTML-тегом;
const MAP_SIZE_TO_HEADER_TAG: Record<TEXT_SIZE, HeaderTagType> = {
    [TEXT_SIZE.S]: 'h3',
    [TEXT_SIZE.M]: 'h2',
    [TEXT_SIZE.L]: 'h1',
};

/**
 * Кастомный текстовый компонент, входящий в комплект UI-kit проекта, который отрисовывает либо яркий и более крупный title, либо более блёклый и мелкий text. Можно отрисовывать то и то;
 *
 * @param className
 * @param title - более яркий и, чуть выше среднего размера, текст;
 * @param text - слегка бледный и обычного размера текст;
 * @param theme - тема текста, для доступа используется TEXT_THEME enum;
 * @param align - выравнивание текста - справа, слева или по-центру, для доступа используется TEXT_ALIGN enum;
 * @param size - размера текста - S, M, L, для доступа используется TEXT_SIZE enum;
 */
export const Text: React.FC<TextPropsI> = memo(({
    className, text, title,
    theme = TEXT_THEME.PRIMARY,
    align = TEXT_ALIGN.LEFT,
    size = TEXT_SIZE.M,
}) => {
    // ? Название с большой буквы, потому что используется как JSX-компонента;
    // ? Используется для отрисовки title для сохранения семантики;
    const HeaderTag: HeaderTagType = MAP_SIZE_TO_HEADER_TAG[size];

    const mods: ModsType = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };

    const additionalClasses: Array<string | undefined> = [
        className,
    ];
    return (
        <div
            data-testid="text-wrapper"
            className={classNames(cls['text-wrapper'], mods, additionalClasses)}
        >
            {
                title
                    ? (
                        <HeaderTag
                            data-testid="title"
                            className={cls.title}
                        >
                            {title}
                        </HeaderTag>
                    )
                    : null
            }
            {
                text
                    ? (
                        <p
                            data-testid="text"
                            className={cls.text}
                        >
                            {text}
                        </p>
                    )
                    : null
            }
        </div>
    );
});
