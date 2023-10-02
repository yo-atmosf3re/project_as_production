import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';

// ? Компонента, которая является главной страницей;
const MainPage = () => {
    const [value, setValue] = React.useState('');
    const onChangeHandler = (value: string) => {
        setValue(value);
    };

    const { t } = useTranslation('main');

    return (
        <div>
            {
                t('Главная страница')
            }
            <Input
                placeholder={
                    t('Введите текст')
                }
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    );
};

export default MainPage;
