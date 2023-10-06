import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text';
import { TEXT_THEME } from 'shared/ui/Text/ui/Text';
import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormPropsI {
    className?: string;
}

// ? Форма для логина;
export const LoginForm: React.FC<LoginFormPropsI> = memo(({
    className,
}) => {
    const { t } = useTranslation('loginForm');
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onClickLogin = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div
            className={classNames(cls['login-form'], {}, [className])}
        >
            <Text
                theme={TEXT_THEME.PRIMARY}
                title={
                    t('Форма авторизации')
                }
            />
            {
                error
                    ? (
                        <Text
                            theme={TEXT_THEME.ERROR}
                            text={
                                t('Вы ввели неверный логин или пароль!')
                            }
                        />
                    )
                    : null
            }
            <Input
                autofocus
                type="text"
                className={classNames(cls.input)}
                placeholder={
                    t('Введите логин')
                }
                value={username}
                onChange={onChangeUsername}
            />
            <Input
                type="text"
                className={classNames(cls.input)}
                placeholder={
                    t('Введите пароль')
                }
                value={password}
                onChange={onChangePassword}
            />
            <Button
                onClick={onClickLogin}
                theme={BUTTON_THEME.OUTLINE}
                className={classNames(cls['login-button'])}
                disabled={isLoading}
            >
                {
                    t('Войти')
                }
            </Button>
        </div>
    );
});
