import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY } from '@/shared/const/consts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';

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
        <ListBox
            className={classNames('', {}, [className])}
            items={OPTIONS}
            value={value}
            defaultValue={
                t('Укажите страну')
            }
            label={
                t('Укажите страну')
            }
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top right"
        />
    );
});
