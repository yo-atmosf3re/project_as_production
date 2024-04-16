/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
    InputHTMLAttributes,
    ReactNode,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputPropsType = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputPropsI extends HTMLInputPropsType {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

/**
 * Компонента-кастомный инпут, входящая в комплект UI-kit проекта, напоминает стилистикой терминал;
 * @param className
 * @param value
 * @param onChange
 * @param autofocus - флаг, отвечающий за фокус на инпуте;
 * @param readonly - передаёт этот флаг в свойство `readOnly` самого инпута (для чтения инпут или нет);
 * @param addonLeft - дополнительный элемент, добавляемый к инпуту слева;
 * @param addonRight - дополнительный элемент, добавляемый к инпуту справа;
 */
export const Input: React.FC<InputPropsI> = memo(
    ({
        type = 'text',
        className,
        value,
        onChange,
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        ...otherProps
    }) => {
        const ref = useRef<HTMLInputElement>(null);
        const [isFocused, setIsFocused] = useState(false);

        // ? При вмонтировании компонента устанавливает автоматический фокус на input;
        useEffect(() => {
            if (autofocus) {
                setIsFocused(true);
                ref.current?.focus();
            }
        }, [autofocus]);

        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        const onBlurHandler = () => {
            setIsFocused(false);
        };

        const onFocusHandler = () => {
            setIsFocused(true);
        };

        const mods: ModsType = {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
            [cls['with-addon_left']]: Boolean(addonLeft),
            [cls['with-addon_right']]: Boolean(addonRight),
        };

        return (
            <div
                className={classNames(cls['input-wrapper'], mods, [className])}
            >
                <div className={cls['addon-left']}>{addonLeft}</div>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    readOnly={readonly}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    className={cls.input}
                    placeholder={placeholder}
                    {...otherProps}
                />
                <div className={cls['addon-right']}>{addonRight}</div>
            </div>
        );
    },
);
