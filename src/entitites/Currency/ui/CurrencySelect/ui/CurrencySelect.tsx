import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { CURRENCY } from '../../../index';

const OPTIONS = [
    { value: CURRENCY.RUB, content: CURRENCY.RUB },
    { value: CURRENCY.USD, content: CURRENCY.USD },
    { value: CURRENCY.EUR, content: CURRENCY.EUR },
];

interface CurrencySelectPropsI {
    className?: string;
    value?: CURRENCY;
    onChange?: (value: CURRENCY) => void;
    readonly?: boolean;
}

export const CurrencySelect: React.FC<CurrencySelectPropsI> = memo(({
    className, value, onChange, readonly,
}) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value: string) => {
        // ? Приводим тип, потому что уверены в том, что в onChange попадёт только тип CURRENCY enum;
        onChange?.(value as CURRENCY);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={
                t('Укажите валюту')
            }
            options={OPTIONS}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});