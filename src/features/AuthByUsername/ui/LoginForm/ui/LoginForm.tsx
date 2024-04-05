import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, BUTTON_THEME } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import { Text, TEXT_THEME } from '@/shared/ui/deprecated/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getLoginUsername } from '../../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormPropsI {
    className?: string;
    onSuccess: () => void;
}

const INITIAL_REDUCERS: ReducersList = {
    loginForm: loginReducer,
};

/**
 * Компонента с формой авторизации;
 * @param className
 * @param onSuccess - содержит логику по открытию/закрытию модального окна с формой логина;
 */
const LoginForm: React.FC<LoginFormPropsI> = memo(
    ({ className, onSuccess }) => {
        const { t } = useTranslation('loginForm');
        const dispatch = useAppDispatch();
        const username = useSelector(getLoginUsername);
        const password = useSelector(getLoginPassword);
        const error = useSelector(getLoginError);
        const isLoading = useSelector(getLoginIsLoading);

        const onChangeUsername = useCallback(
            (value: string) => {
                dispatch(loginActions.setUsername(value));
            },
            [dispatch],
        );

        const onChangePassword = useCallback(
            (value: string) => {
                dispatch(loginActions.setPassword(value));
            },
            [dispatch],
        );

        const onClickLogin = useCallback(async () => {
            const result = await dispatch(
                loginByUsername({
                    username,
                    password,
                }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        }, [onSuccess, dispatch, password, username]);

        return (
            <DynamicModuleLoader reducers={INITIAL_REDUCERS}>
                <VStack
                    className={classNames(
                        cls['login-form'], //
                        {},
                        [className],
                    )}
                >
                    <Text
                        theme={TEXT_THEME.PRIMARY}
                        title={t('Форма авторизации')}
                    />
                    {error ? (
                        <Text
                            theme={TEXT_THEME.ERROR}
                            text={t('Вы ввели неверный логин или пароль!')}
                        />
                    ) : null}
                    <Input
                        autofocus
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите логин')}
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите пароль')}
                        value={password}
                        onChange={onChangePassword}
                    />
                    <Button
                        onClick={onClickLogin}
                        theme={BUTTON_THEME.OUTLINE}
                        className={cls['login-button']}
                        disabled={isLoading}
                    >
                        {t('Войти')}
                    </Button>
                </VStack>
            </DynamicModuleLoader>
        );
    },
);

export default LoginForm;
