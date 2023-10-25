import React, { memo } from 'react';
import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getArticleCommentsIsLoading,
} from '../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommetsReducer, getArticleComments } from '../model/slice/articleDetailsCommentSlice';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsPagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articleDetailsComments: articleDetailsCommetsReducer,
};

/**
 * Страница полной и конкретной статьи, с блоками, комментариями, содержимым;
 * @param className
 */
const ArticleDetailsPage: React.FC<ArticleDetailsPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commetsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div
                className={classNames(cls['article-detials'], {}, [className])}
            >
                {
                    t('Статья не найдена!')
                }
            </div>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
            removeAfterUnmount
        >
            <div
                className={classNames(cls['article-detials'], {}, [className])}
            >
                <ArticleDetails
                    id={id}
                />
                <Text
                    className={cls['comment-title']}
                    title={
                        t('Комментарии')
                    }
                />
                <CommentList
                    isLoading={commetsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
