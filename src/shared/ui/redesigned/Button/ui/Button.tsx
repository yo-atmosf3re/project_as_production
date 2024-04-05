import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Button.module.scss';

/**
 * Стилистические типы кнопки;
 * @param clear
 * @param outline
 */
export type ButtonVariantType = 'clear' | 'outline';

/**
 * Размеры кнопки, значения которых соответствуют значениям css-переменным из global.scss (используются размеры из переменных, которые ответственны за размер шрифтов);
 * @param M
 * @param L
 * @param XL
 */
export type ButtonSizeType = 'm' | 'l' | 'xl';

interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariantType;
    square?: boolean;
    size?: ButtonSizeType;
    disabled?: boolean;
    children: ReactNode;
    fullWidth?: boolean;
}

/**
 * Кнопка с возможностью кастомизации, входящая в обновлённый комплект UI-kit проекта;
 *
 * @param className
 * @param children - содержимое кнопки;
 * @param theme - тема кнопки, для доступа используется BUTTON_THEME enum (по-умолчанию - OUTLINE);
 * @param square - флаг, указывающий, что кнопка должна быть квадратной;
 * @param size - размер кнопки, для доступа используется BUTTON_SIZE enum (по-умолчанию - M);
 * @param disabled - возможность отключить кнопку;
 * @param fullWidth - флаг, указывающий на то, нужно ли растягивать кнопку по всей ширине или нет;
 */
export const Button: React.FC<ButtonPropsI> = memo(
    ({
        className,
        children,
        variant = 'outline',
        size = 'm',
        square,
        disabled,
        fullWidth,
        ...otherProps
    }) => {
        const mods: ModsType = {
            [cls.square]: square,
            [cls.disabled]: disabled,
            [cls['full-width']]: fullWidth,
        };
        const additionalClasses: Array<string | undefined> = [
            className,
            cls[variant],
            cls[size],
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
    },
);
