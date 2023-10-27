import { FC, lazy } from 'react';
import { AddCommentFormPropsI } from './AddCommentForm';

// ? Компонента, которая обёрнута в lazy и тестово вызывается слегка позже;
export const AddCommentFormAsync = lazy <FC<AddCommentFormPropsI>>(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
