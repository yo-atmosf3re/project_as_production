import React, {
    ButtonHTMLAttributes,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Button.module.scss';

/**
 * Стилистические типы кнопки;
 * @param clear
 * @param outline
 * @param filled
 */
export type ButtonVariantType = 'clear' | 'outline' | 'filled';

/**
 * Цветовые варианты кнопки;
 * @param normal
 * @param success
 * @param error
 */
export type ButtonColorType = 'normal' | 'success' | 'error';

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
    color?: ButtonColorType;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

/**
 * Кнопка с возможностью кастомизации, входящая в обновлённый комплект UI-kit проекта;
 *
 * @param className
 * @param children - содержимое кнопки;
 * @param variant - тема кнопки;
 * @param square - флаг, указывающий, что кнопка должна быть квадратной;
 * @param size - размер кнопки, для доступа используется BUTTON_SIZE enum (по-умолчанию - M);
 * @param disabled - возможность отключить кнопку;
 * @param fullWidth - флаг, указывающий на то, нужно ли растягивать кнопку по всей ширине или нет;
 * @param addonLeft - дополнительный элемент, добавляемый к кнопке слева;
 * @param addonRight - дополнительный элемент, добавляемый к кнопке справа;
 */
export const Button: React.FC<ButtonPropsI> = forwardRef(
    (
        {
            className,
            children,
            variant = 'outline',
            size = 'm',
            square,
            disabled,
            fullWidth,
            color = 'normal',
            addonLeft,
            addonRight,
            ...otherProps
        },
        // ? Headless UI использует forwardRef при указании какой-либо своей компоненты в as в компоненте самой библиотеки. Для устранения всех проблем используется forwardRef;
        ref: ForwardedRef<HTMLButtonElement>,
    ) => {
        const mods: ModsType = {
            [cls.square]: square,
            [cls.disabled]: disabled,
            [cls['full-width']]: fullWidth,
            [cls['with-addon']]: Boolean(addonLeft) || Boolean(addonRight),
        };
        const additionalClasses: Array<string | undefined> = [
            className,
            cls[variant],
            cls[size],
            cls[color],
        ];
        return (
            <button
                disabled={disabled}
                type="button"
                className={classNames(cls.button, mods, additionalClasses)}
                {...otherProps}
                ref={ref}
            >
                <div className={cls['addon-left']}>{addonLeft}</div>
                {children}
                <div className={cls['addon-right']}>{addonRight}</div>
            </button>
        );
    },
);
