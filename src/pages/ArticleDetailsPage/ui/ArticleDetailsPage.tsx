import React, { memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { BUTTON_THEME, Button } from 'shared/ui/Button';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page';
import { TEXT_SIZE } from 'shared/ui/Text/ui/Text';
import {
    getArticleCommentsIsLoading,
} from '../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommetsReducer, getArticleComments } from '../model/slice/articleDetailsCommentSlice';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleDetailsRecommendationsError }
    from '../model/selectors/getArticleDetailsRecommendationsError/getArticleDetailsRecommendationsError';
import { articleDetailsPageRecommendationsReducer, getArticleDetailsRecommendations }
    from '../model/slice/articleDetailsPageRecommendationsSlice';
import { getArticleDetailsRecommendationsIsLoading }
    from '../model/selectors/getArticleDetailsRecommendationsIsLoading/getArticleDetailsRecommendationsIsLoading';
import { fetchArticleRecommendations } from '../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleDetailsPagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articleDetailsComments: articleDetailsCommetsReducer,
    articleDetailsPageRecommendations: articleDetailsPageRecommendationsReducer,
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
    const navigate = useNavigate();
    const comments = useSelector(getArticleComments.selectAll);
    const commetsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleDetailsRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleDetailsRecommendationsIsLoading);
    const recommendationsError = useSelector(getArticleDetailsRecommendationsError);

    const onBackToList = useCallback(() => {
        navigate(ROUTES_PATH.articles);
    }, [navigate]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
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
                <Button
                    theme={BUTTON_THEME.OUTLINE}
                    onClick={onBackToList}
                >
                    {
                        t('Назад к списку')
                    }
                </Button>
                <ArticleDetails
                    id={id}
                />
                <Text
                    size={TEXT_SIZE.L}
                    className={cls.recommendations}
                    title={
                        t('Рекомендуем')
                    }
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                />
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
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
