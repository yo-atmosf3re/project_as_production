import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox';
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
        <ListBox
            className={classNames('', {}, [className])}
            onChange={onChangeHandler}
            value={value}
            defaultValue={
                t('Укажите валюту')
            }
            label={
                t('Укажите валюту')
            }
            items={OPTIONS}
            readonly={readonly}
            direction="top"
        />
    );
});
