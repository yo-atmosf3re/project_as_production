import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { TEXT_SIZE, Text } from 'shared/ui/Text';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../../model/slice/articleDetailsCommentSlice';
import { getArticleCommentsIsLoading } from
    '../../../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import cls from './ArticleDetailsComments.module.scss';

interface ArticleDetailsCommentsPropsI {
    className?: string;
    id: string;
}

/**
 *
 * @param className
 */
export const ArticleDetailsComments: React.FC<ArticleDetailsCommentsPropsI> = ({
    className, id,
}) => {
    const { t } = useTranslation();

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
        <div
            className={classNames(cls.ArticleDetailsComments, {}, [className])}
        >
            <Text
                size={TEXT_SIZE.L}
                className={cls['comment-title']}
                title={
                    t('Комментарии')
                }
            />
            <AddCommentForm
                onSendComment={onSendComment}
            />
            <CommentList
                isLoading={commetsIsLoading}
                comments={comments}
            />
        </div>
    );
};