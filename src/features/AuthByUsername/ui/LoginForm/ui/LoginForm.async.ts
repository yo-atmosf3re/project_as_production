import { FC, lazy } from 'react';
import { LoginFormPropsI } from './LoginForm';

// ? Компонента, которая обёрнута в lazy и тестово вызывается слегка позже;
// ? Для того, чтобы не было потери типизации у LoginForm добавляем в дженерики lazy типизацию пропсов для компоненты;
export const LoginFormAsync = lazy<FC<LoginFormPropsI>>(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
