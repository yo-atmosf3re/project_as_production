import React, { Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TEXT_SIZE, Text } from '@/shared/ui/Text';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/AddCommentForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { fetchCommentsByArticleId } from '../../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../../model/slice/articleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from
    '../../../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import cls from './ArticleDetailsComments.module.scss';

interface ArticleDetailsCommentsPropsI {
    className?: string;
    id?: string;
}

/**
 * Компонента, внутри которой декомпозирована логика с отрисовкой блока с комментариями (добавление комментариев, их отображение);
 * @param className
 */
export const ArticleDetailsComments: React.FC<ArticleDetailsCommentsPropsI> = ({
    className, id,
}) => {
    const { t } = useTranslation('article');

    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const commetsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            <Text
                size={TEXT_SIZE.L}
                className={cls['comment-title']}
                title={
                    t('Комментарии')
                }
            />
            <Suspense
                fallback={(
                    <Loader />
                )}
            >
                <AddCommentForm
                    onSendComment={onSendComment}
                />
            </Suspense>
            <CommentList
                isLoading={commetsIsLoading}
                comments={comments}
            />
        </VStack>
    );
};
