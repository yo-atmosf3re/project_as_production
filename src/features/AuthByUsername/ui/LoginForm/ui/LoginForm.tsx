import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import cls from './LoginForm.module.scss';

interface LoginFormPropsI {
    className?: string;
}

// ? Форма для логина;
export const LoginForm: React.FC<LoginFormPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('loginForm');
    return (
        <div
            className={classNames(cls['login-form'], {}, [className])}
        >
            <Input
                autofocus
                type="text"
                className={classNames(cls.input)}
                placeholder={
                    t('Введите логин')
                }
            />
            <Input
                type="text"
                className={classNames(cls.input)}
                placeholder={
                    t('Введите пароль')
                }
            />
            <Button
                theme={BUTTON_THEME.OUTLINE}
                className={classNames(cls['login-button'])}
            >
                {
                    t('Войти')
                }
            </Button>
        </div>
    );
};
