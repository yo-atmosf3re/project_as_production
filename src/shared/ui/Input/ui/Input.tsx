/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
    InputHTMLAttributes, SelectHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

// ? Omit позволяет забрать из типа все пропсы, но исключить какие-то, которые не нужны. Первый аргумент - это то, что нужно забрать, а вторым аргументом - то, что нужно исключить. В этом случае это value и onChange. Потом расширяемся от этого типа, сохранив все пропсы инпута, исключив value и onChange, описав потом их самостоятельно;
type HTMLInputPropsType = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputPropsI extends HTMLInputPropsType {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

// ? Нетривиальный способ расширить имеющийся тип, потому что типизация из коробки не работала должным образом при данном кейсе;
interface SelectHandlerI extends React.ChangeEventHandler<HTMLInputElement> {
    target?: EventTarget & HTMLInputElement
}

// ? Кастомный инпут, напоминает стилистикой терминал;
export const Input: React.FC<InputPropsI> = memo(({
    className, value, onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    // ? Для вычисления позиции мигающей каретки в поле ввода;
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    // ? При вмонтировании компонента устанавливает автоматический фокус на input;
    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    // ? При отсутствии фокуса на input убирает каретку;
    const onBlurHandler = () => {
        setIsFocused(false);
    };

    // ? При появлении фокуса на input добавляет каретку;
    const onFocusHandler = () => {
        setIsFocused(true);
    };

    // ? При навигации по input двигает каретку в нужном направлении при фокусе;
    const onSelectHandler: SelectHandlerI = (e) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };
    return (
        <div
            className={classNames(cls['input-wrapper'], {}, [className])}
        >
            {
                placeholder
                    ? (
                        <div className={cls.placeholder}>
                            {`${placeholder}>`}
                        </div>
                    )
                    : null
            }
            <div className={cls['caret-wrapper']}>
                <input
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    onSelect={onSelectHandler}
                    className={cls.input}
                    {...otherProps}
                />
                { // ? Появление т.н каретки в поле ввода;
                    isFocused
                        ? (
                            <span
                                className={cls.caret}
                                style={{ left: `${caretPosition * 9}px` }}
                            />
                        )
                        : null
                }
            </div>
        </div>
    );
});
