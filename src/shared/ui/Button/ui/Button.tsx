import React, { ButtonHTMLAttributes } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum BUTTON_THEME {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clear-inverted',
    OUTLINE = 'outline',
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
}

// ? Кастомизированная компонента-кнопка;
export const Button: React.FC<ButtonPropsI> = ({
    className, children, theme, square,
    disabled,
    size = BUTTON_SIZE.M,
    ...otherProps
}) => {
    const mods: ModsType = {
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
    };
    const additionalClasses: string[] = [
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
};
