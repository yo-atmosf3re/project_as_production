/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum THEME_BUTTON {
    CLEAR = 'clear',
    OUTLINE = 'outline'
}

interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: THEME_BUTTON;
}

// ? Кастомизированная компонента-кнопка;
export const Button: React.FC<ButtonPropsI> = ({
    className, children, theme, ...otherProps
}) => (
    <button
        type="button"
        className={classNames(cls.button, {}, [className, cls[theme]])}
        {...otherProps}
    >
        {children}
    </button>
);
