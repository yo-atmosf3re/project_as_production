import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { COUNTRY } from '../../../index';

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

export const CountrySelect: React.FC<CountrySelectPropsI> = memo(({
    className, value, onChange, readonly,
}) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as COUNTRY);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={
                t('Укажите страну')
            }
            options={OPTIONS}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
