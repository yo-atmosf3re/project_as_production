import React, { memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { BUTTON_THEME, Button } from 'shared/ui/Button';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page';
import {
    getArticleCommentsIsLoading,
} from '../model/selectors/getArticleCommentsIsLoading/getArticleCommentsIsLoading';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommetsReducer, getArticleComments } from '../model/slice/articleDetailsCommentSlice';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';

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
    const navigate = useNavigate();
    const comments = useSelector(getArticleComments.selectAll);
    const commetsIsLoading = useSelector(getArticleCommentsIsLoading);

    const onBackToList = useCallback(() => {
        navigate(ROUTES_PATH.articles);
    }, [navigate]);

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
