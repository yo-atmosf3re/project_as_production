import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import {
    getArticlesPageIsLoading, getArticlesPageError,
    getArticlesPageView,
} from '../../model/selectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters';

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
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader
            removeAfterUnmount={false}
            reducers={INITIAL_REDUCERS}
        >
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls['article-page'], {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
