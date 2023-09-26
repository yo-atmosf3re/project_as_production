/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum BUTTON_THEME {
    CLEAR = 'clear',
    OUTLINE = 'outline',
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
}

// ? Кастомизированная компонента-кнопка;
export const Button: React.FC<ButtonPropsI> = ({
    className, children, theme, square,
    size = BUTTON_SIZE.M,
    ...otherProps
}) => {
    const mods: ModsType = {
        [cls.square]: square,
        [cls[size]]: true,
    };
    const additionalClasses: string[] = [
        className, cls[theme],
    ];
    return (
        <button
            type="button"
            className={classNames(cls.button, mods, additionalClasses)}
            {...otherProps}
        >
            {children}
        </button>
    );
};
