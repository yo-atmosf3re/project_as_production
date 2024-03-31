import React, { ChangeEvent, useMemo } from 'react';
import { HStack } from '../../Stack';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptionI<T extends string> {
    value: T;
    content: string;
}

interface SelectPropsI<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOptionI<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

/**
 * Кастомная компонента select, входящая в комплект UI-kit проекта, которую можно настроить под себя различными пропсами. Поддерживает дженерики, где `T` тип принимаемого значения;
 * @param className
 * @param label - описание/название рядом с select;
 * @param readonly - флаг по которому добавляется disabled для select;
 * @param options - массив с `option`, где value - это `T`, а `content` это обычный `string`;
 * @param value - принмает тип `T`;
 * @param onChange - обработчик, в аргументах которого принимается `T`;
 */
export const Select = <T extends string>({
    // ? Для корректной работы с дженериками и типизации было убрано memo. Позже будет исправлено;
    className,
    label,
    options,
    value,
    onChange,
    readonly,
}: SelectPropsI<T>) => {
    const mods: ModsType = {};
    const additionalClasses: Array<string | undefined> = [className];

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        // ? В этом месте каст типов допустим, потому что есть типы контролируется из вышестоящего уровня, а именно - из пропсов, и кроме нужно типа Т сюда ничего не попадёт;
        onChange?.(e.target.value as T);
    };

    const optionsList: JSX.Element[] | undefined = useMemo(
        () =>
            options?.map((opt) => (
                <option
                    className={cls.option}
                    value={opt.value}
                    key={opt.value}
                >
                    {opt.content}
                </option>
            )),
        [options],
    );

    return (
        <HStack className={classNames('', {}, additionalClasses)}>
            {label ? <span className={cls.label}>{`${label}>`}</span> : null}
            <select
                className={classNames(cls.select, mods, [])}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </HStack>
    );
};
