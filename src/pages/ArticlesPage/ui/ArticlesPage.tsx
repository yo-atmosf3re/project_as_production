import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ARTICLE_VIEW, ArticleList, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { Page } from 'shared/ui/Page';
import cls from './ArticlesPage.module.scss';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlesPageIsLoading } from '../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageError } from '../model/selectors/getArticlesPageError/getArticlesPageError';
import { getArticlesPageView } from '../model/selectors/getArticlesPageView/getArticlesPageView';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPagePropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    articlesPage: articlesPageReducer,
};

/**
 * Страница со списком всех статей, содержит поиск по статьям, фильтры, переключатель отображения вида статей;
 * @param className
 */
const ArticlesPage: React.FC<ArticlesPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    const onChangeView = useCallback((view: ARTICLE_VIEW) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({
            page: 1,
        }));
    });

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls['article-page'], {}, [className])}
            >
                <ArticleViewSelector
                    view={view}
                    onViewClickHandler={onChangeView}
                />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
