import { FC, lazy } from 'react';
import { LoginFormPropsI } from './LoginForm';

// ? Для того, чтобы не было потери типизации у LoginForm добавляем в дженерики lazy типизацию пропсов для компоненты;
export const LoginFormAsync = lazy<FC<LoginFormPropsI>>(
    () => import('./LoginForm'),
);
