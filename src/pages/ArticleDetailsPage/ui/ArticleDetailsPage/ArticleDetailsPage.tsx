import React, { memo, useCallback } from 'react';
import { Text, TEXT_SIZE } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommenadtionsList } from 'features/ArticleRecommenadtionsList';
import {
    getArticleCommentsIsLoading,
} from '../../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slice/articleDetailsCommentSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader';

interface ArticleDetailsPagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
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

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <Page
                className={classNames(cls['article-detials'], {}, [className])}
            >
                {
                    t('Статья не найдена!')
                }
            </Page>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <Page
                className={classNames(cls['article-detials'], {}, [className])}
            >
                <VStack
                    gap="16"
                    max
                >
                    <ArticleDetailsPageHeader />
                    <ArticleDetails
                        id={id}
                    />
                    <ArticleRecommenadtionsList />
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
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
