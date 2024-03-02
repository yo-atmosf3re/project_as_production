import { FC, lazy } from 'react';
import { AddCommentFormPropsI } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<AddCommentFormPropsI>>(
    () => import('./AddCommentForm'),
);
