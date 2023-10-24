import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { ModsType, classNames } from '../../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum BUTTON_THEME {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clear-inverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline-red',
    OUTLINE_INVERTED = 'outline-inverted',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum BUTTON_SIZE {
    M = 'size_m',
    XL = 'size_xl',
    L = 'size_l',
}

interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: BUTTON_THEME;
    square?: boolean;
    size?: BUTTON_SIZE;
    disabled?: boolean;
    children: ReactNode;
}

// ? Почему можно оборачивать Button-компоненту в memo? Ведь у неё же есть children, а если у компоненты есть children, то делать этого не нужно, потому что children может являться древовидной структурой из нескольких вложенных друг в друга тегов и так далее. Но в случае с кнопкой - children это примитив, то есть текст, и примитивы мемоизировать не сложно и не затруднительно, потому что они сравниваются по значению, а не по ссылке как объекты в случае древововидной структуры вложенных тегов/компонентов и так далее. Поэтому можно и нужно мемоизировать в memo такие компоненты;
/**
 * Кнопка с возможностью кастомизации, входящая в комплект UI-kit проекта;
 *
 * @param className
 * @param children - содержимое кнопки;
 * @param theme - тема кнопки, для доступа используется BUTTON_THEME enum;
 * @param square - флаг, указывающий, что кнопка должна быть квадратной;
 * @param size - размер кнопки, для доступа используется BUTTON_SIZE enum;
 * @param disabled - возможность отключить кнопку;
 */
export const Button: React.FC<ButtonPropsI> = memo(({
    className, children,
    theme = BUTTON_THEME.OUTLINE,
    size = BUTTON_SIZE.M,
    square,
    disabled,
    ...otherProps
}) => {
    const mods: ModsType = {
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
    };
    const additionalClasses: Array<string | undefined> = [
        className, cls[theme],
    ];
    return (
        <button
            disabled={disabled}
            type="button"
            className={classNames(cls.button, mods, additionalClasses)}
            {...otherProps}
        >
            {children}
        </button>
    );
});
