import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text';
import { TEXT_THEME } from 'shared/ui/Text/ui/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginUsername } from '../../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormPropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    loginForm: loginReducer,
};

// ? Форма для логина;
const LoginForm: React.FC<LoginFormPropsI> = memo(({
    className,
}) => {
    const { t } = useTranslation('loginForm');
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

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
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
            removeAfterUnmount
        >
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
                    className={cls.input}
                    placeholder={
                        t('Введите логин')
                    }
                    value={username}
                    onChange={onChangeUsername}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={
                        t('Введите пароль')
                    }
                    value={password}
                    onChange={onChangePassword}
                />
                <Button
                    onClick={onClickLogin}
                    theme={BUTTON_THEME.OUTLINE}
                    className={cls['login-button']}
                    disabled={isLoading}
                >
                    {
                        t('Войти')
                    }
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
