import React, { memo } from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Text.module.scss';

/**
 * Цветовые темы для текста;
 * @param PRIMARY - text - использует secondary-color, title - использует primary-color;
 * @param ERROR - text - тёмно-красный, title - светло-красный;
 */
export type TextVariantType = 'primary' | 'error' | 'accent';

/**
 * Направление текста;
 */
export type TextAlignType = 'right' | 'left' | 'center';

/**
 * Размер текста;
 * @param S - text - 12px, title - 16px;
 * @param M - text - 16px, title - 24px;
 * @param L - text - 24px, title - 32px;
 */
export type TextSizeType = 's' | 'm' | 'l';

interface TextPropsI {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariantType;
    align?: TextAlignType;
    size?: TextSizeType;
    bold?: boolean;
    'data-testid'?: string;
}

export type HeaderTagType = 'h1' | 'h2' | 'h3';

const MAP_SIZE_TO_CLASS: Record<TextSizeType, string> = {
    s: cls['size-s'],
    m: cls['size-m'],
    l: cls['size-l'],
};

// ? Маппер для сопоставления размера шрифта с HTML-тегом;
const MAP_SIZE_TO_HEADER_TAG: Record<TextSizeType, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

/**
 * Кастомный текстовый компонент, входящий в комплект UI-kit проекта, который отрисовывает либо яркий и более крупный title, либо более блёклый и мелкий text. Можно отрисовывать то и то;
 *
 * @param className
 * @param title - более яркий и, чуть выше среднего размера, текст;
 * @param text - обычного размера текст;
 * @param variant - цветовая тема текста;
 * @param align - выравнивание текста - справа, слева или по-центру, для доступа используется TEXT_ALIGN enum;
 * @param size - размера текста - S, M, L, для доступа используется TEXT_SIZE enum;
 * @param bold - флаг, указывающий является ли текст жирным или нет;
 */
export const Text: React.FC<TextPropsI> = memo(
    ({
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
    }) => {
        // ? Название с большой буквы, потому что используется как JSX-компонента;
        // ? Используется для отрисовки title для сохранения семантики;
        const HeaderTag: HeaderTagType = MAP_SIZE_TO_HEADER_TAG[size];
        const sizeClass = MAP_SIZE_TO_CLASS[size];

        const mods: ModsType = {
            [cls.bold]: bold,
        };

        const additionalClasses: Array<string | undefined> = [
            className,
            cls[variant],
            cls[align],
            sizeClass,
        ];
        return (
            <div
                data-testid="text-wrapper"
                className={classNames(
                    cls['text-wrapper'],
                    mods,
                    additionalClasses,
                )}
            >
                {title ? (
                    <HeaderTag
                        data-testid={`${dataTestId}.Header`}
                        className={cls.title}
                    >
                        {title}
                    </HeaderTag>
                ) : null}
                {text ? (
                    <p
                        data-testid={`${dataTestId}.Paragraph`}
                        className={cls.text}
                    >
                        {text}
                    </p>
                ) : null}
            </div>
        );
    },
);
