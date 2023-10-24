import React, { ChangeEvent, memo, useMemo } from 'react';
import { ModsType, classNames } from '../../../lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptionI {
    value: string;
    content: string;
}

/**
 * Кастомная компонента selector, которую можно настроить под себя различными пропсами;
 *
 * @param className - дополнительный класс для select;
 * @param  - ;
 * @param  - ;
 * @param  - ;
 * @param  - ;
*/
interface SelectPropsI {
    className?: string;
    label?: string;
    options?: SelectOptionI[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

// ? Переиспользуемая компонента select, входящая в комплект UI-kit проекта;
export const Select: React.FC<SelectPropsI> = memo(({
    className, label, options,
    value, onChange, readonly,
}) => {
    const mods: ModsType = {};
    const additionalClasses: Array<string | undefined> = [className];

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const optionsList: JSX.Element[] | undefined = useMemo(() => options
        ?.map((opt) => (
            <option
                className={cls.option}
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        )), [options]);

    return (
        <div
            className={classNames(cls['select-wrapper'], {}, additionalClasses)}
        >
            {
                label
                    ? (
                        <span
                            className={cls.label}
                        >
                            {
                                `${label}>`
                            }
                        </span>
                    )
                    : null
            }
            <select
                className={classNames(cls.select, mods, [])}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {
                    optionsList
                }
            </select>
        </div>
    );
});
