import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { CURRENCY } from '@/shared/const/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

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

export const CurrencySelect: React.FC<CurrencySelectPropsI> = memo(
    ({ className, value, onChange, readonly }) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback(
            (value: string) => {
                // ? Приводим тип, потому что уверены в том, что в onChange попадёт только тип CURRENCY enum;
                onChange?.(value as CURRENCY);
            },
            [onChange],
        );

        const props = {
            className,
            value,
            defaultValue: t('Укажите валюту'),
            label: t('Укажите валюту'),
            items: OPTIONS,
            onChange: onChangeHandler,
            readonly,
            direction: 'top right' as const,
        };

        const deprecatedCurrencySelect = <ListBoxDeprecated {...props} />;

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ListBox {...props} />}
                off={deprecatedCurrencySelect}
            />
        );
    },
);
