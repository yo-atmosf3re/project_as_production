import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY } from '@/shared/const/consts';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

const OPTIONS = [
    { value: COUNTRY.RUSSIA, content: COUNTRY.RUSSIA },
    { value: COUNTRY.BELARUS, content: COUNTRY.BELARUS },
    { value: COUNTRY.KAZAKHSTAN, content: COUNTRY.KAZAKHSTAN },
    { value: COUNTRY.ARMENIA, content: COUNTRY.ARMENIA },
    { value: COUNTRY.UKRAIN, content: COUNTRY.UKRAIN },
];

interface CountrySelectPropsI {
    className?: string;
    value?: COUNTRY;
    onChange?: (value: COUNTRY) => void;
    readonly?: boolean;
}

export const CountrySelect: React.FC<CountrySelectPropsI> = memo(
    ({ className, value, onChange, readonly }) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as COUNTRY);
            },
            [onChange],
        );

        const props = {
            className,
            items: OPTIONS,
            value,
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
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
