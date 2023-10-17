import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
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
/**
 * Кнопка с возможностью кастомизации;
 *
 * @param className - дополнительный класс для кнопки;
 * @param children - содержимое кнопки;
 * @param theme - тема кнопки;
 * @param square - флаг, указывающий, что кнопка должна быть квадратной;
 * @param size - размер кнопки;
 * @param disabled - возможность отключить кнопку;
 */
interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: BUTTON_THEME;
    square?: boolean;
    size?: BUTTON_SIZE;
    disabled?: boolean;
    children: ReactNode;
}

// ? Кастомизированная компонента-кнопка;
// ? Почему можно оборачивать Button-компоненту в memo? Ведь у неё же есть children, а если у компоненты есть children, то делать этого не нужно, потому что children может являться древовидной структурой из нескольких вложенных друг в друга тегов и так далее. Но в случае с кнопкой - children это примитив, то есть текст, и примитивы мемоизировать не сложно и не затруднительно, потому что они сравниваются по значению, а не по ссылке как объекты в случае древововидной структуры вложенных тегов/компонентов и так далее. Поэтому можно и нужно мемоизировать в memo такие компоненты;
export const Button: React.FC<ButtonPropsI> = memo(({
    className, children,
    theme = BUTTON_THEME.OUTLINE,
    square,
    disabled,
    size = BUTTON_SIZE.M,
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
