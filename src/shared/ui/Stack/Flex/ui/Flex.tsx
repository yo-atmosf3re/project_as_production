import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

/**
 * Union-тип для управления нативным свойством `justify-content`;
 */
export type FlexJustifyType = 'start' | 'center' | 'end' | 'between';
/**
 * Union-тип для управления нативным свойством `align-items`;
 */
export type FlexAlignType = 'start' | 'center' | 'end';
/**
 * Union-тип для управления нативным свойством `flex-direction`;
 */
export type FlexDirectionType = 'row' | 'column';
/**
 * Union-тип для управления нативным свойством 'gap';
 */
export type FlexGapType = '4' | '8' | '16' | '32';

// ? Сопастовитель (маппер) для css-классов;
const JUSTIFY_CLASSES: Record<FlexJustifyType, string> = {
    start: cls['justify-start'],
    center: cls['justify-center'],
    end: cls['justify-end'],
    between: cls['justify-between'],
};

// ? Сопастовитель (маппер) для css-классов;
const ALIGN_CLASSES: Record<FlexAlignType, string> = {
    start: cls['align-start'],
    center: cls['align-center'],
    end: cls['align-end'],
};

// ? Сопастовитель (маппер) для css-классов;
const DIRECTION_CLASSES: Record<FlexDirectionType, string> = {
    row: cls['direction-row'],
    column: cls['direction-column'],
};

// ? Сопастовитель (маппер) для css-классов;
const GAP_CLASSES: Record<FlexGapType, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};

// ? Описание типов для HTML-тега div, от которого будет расширяться основной тип FlexPropsI;
type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexPropsI extends DivPropsType {
    className?: string;
    children: ReactNode;
    justify?: FlexJustifyType;
    align?: FlexAlignType;
    direction: FlexDirectionType;
    gap?: FlexGapType;
    max?: boolean;
}

// ? Почему бы не использовать инлайн-стили? Потому что у них слишком высокая специфичность, и если захочется откуда-то из вне их переопределить, то придётся использовать !important. И, во всяком случае, такое количество созданных классов в Flex.module.scss, которые похожи друг на друга, компенсируется тем, что при работе с проектом и созданием UI компонента Flex просто будет переиспользоваться, и эти же самые стили в таком количестве написаны не будут;
/**
 * Компонент, входящий в комплект UI-kit проекта, регулирующий отступы, позиционирование, направление вертикальное или горизонтальное. Компонент общего характера, являющийся внутренним;
 * @param className
 * @param children
 * @param justify - пропс для управления нативным свойством `justify-content`;
 * @param align - пропс для управления нативным свойством `align-items`;
 * @param direction - пропс для управления нативным свойством `flex-direction`;
 * @param gap - пропс для управления нативным свойством `gap`. Значения в union-типе взяты из дизайн системы;
 * @param max - пропс для управления размерами блока: если `true`, то растягивает блок на всю ширину, если `false`, то размер блока будет равняться размеру содержимого этого блока;
 */
export const Flex: React.FC<FlexPropsI> = ({
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap, max,
}) => {
    const additionalClasses: Array<string | undefined> = [
        className,
        JUSTIFY_CLASSES[justify],
        ALIGN_CLASSES[align],
        DIRECTION_CLASSES[direction],
        // ? Для исключения проблем, которые связаны с тем, что gap может быть undefined, используется вот такая контструкция;
        gap && GAP_CLASSES[gap],
    ];

    const mods: ModsType = {
        [cls.max]: max,
    };

    return (
        <div
            className={classNames(cls.flex, mods, additionalClasses)}
        >
            {
                children
            }
        </div>
    );
};
