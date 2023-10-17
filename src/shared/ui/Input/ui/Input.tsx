/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
    InputHTMLAttributes, SelectHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

// ? Omit позволяет забрать из типа все пропсы, но исключить какие-то, которые не нужны. Первый аргумент - это то, что нужно забрать, а вторым аргументом - то, что нужно исключить. В этом случае это value и onChange. Потом расширяемся от этого типа, сохранив все пропсы инпута, исключив value и onChange, описав потом их самостоятельно;
type HTMLInputPropsType = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputPropsI extends HTMLInputPropsType {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
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
    readonly,
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    // ? Для вычисления позиции мигающей каретки в поле ввода;
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);
    // ? Появление т.н каретки в поле ввода. Не появляется, если инпут для чтения;
    const isCaretVisible = isFocused && !readonly;

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

    const mods: ModsType = {
        [cls.readonly]: readonly,
    };

    // ? Хранит в себе ">" вместе с placeholder. Класс angel-bracket даёт анимацию мигания для знака ">". Отражает этот знак и делает его мигающим в том случае, если инпут не readonly;
    const angleBracketCondition = readonly
        ? <>{`${placeholder}\u00A0`}</>
        : (
            <>
                {`${placeholder}`}
                <span className={cls['angle-bracket']}>{'>'}</span>
            </>
        );

    return (
        <div
            className={classNames(cls['input-wrapper'], mods, [className])}
        >
            {
                placeholder
                    ? (
                        <div className={cls.placeholder}>
                            {
                                angleBracketCondition
                            }
                        </div>
                    )
                    : null
            }
            <div className={cls['caret-wrapper']}>
                <input
                    type={type}
                    value={value}
                    readOnly={readonly}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    onSelect={onSelectHandler}
                    className={cls.input}
                    {...otherProps}
                />
                {
                    isCaretVisible
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
