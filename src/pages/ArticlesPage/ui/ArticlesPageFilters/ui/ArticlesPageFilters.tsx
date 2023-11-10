import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ARTICLE_SORT_FIELD, ARTICLE_VIEW, ArticleViewSelector } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Card } from 'shared/ui/Card';
import { Input } from 'shared/ui/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector';
import { SortOrderType } from 'shared/types';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlesPageSearch } from '../../../model/selectors/getArticlesPageSearch/getArticlesPageSearch';
import { getArticlesPageOrder } from '../../../model/selectors/getArticlesPageOrder/getArticlesPageOrder';
import { getArticlesPageSort } from '../../../model/selectors/getArticlesPageSort/getArticlesPageSort';
import { getArticlesPageView } from '../../../model/selectors/getArticlesPageView/getArticlesPageView';
import { articlesPageActions } from '../../../model/slice/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersPropsI {
    className?: string;
}

export const ArticlesPageFilters: React.FC<ArticlesPageFiltersPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);

    // ? Избавляясь от лишних сайд-эффектов, передаём эту функцию в каждый обработчик;
    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const onChangeView = useCallback((view: ARTICLE_VIEW) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((newSort: ARTICLE_SORT_FIELD) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrderType) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div
            className={classNames(cls['articles-page_filters'], {}, [className])}
        >
            <div
                className={cls['sort-wrapper']}
            >
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClickHandler={onChangeView}
                />
            </div>
            <Card
                className={cls.search}
            >
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={
                        t('Поиск')
                    }
                />
            </Card>
        </div>
    );
};
