import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    ArticleViewSelector,
    ArticleSortSelector,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import { SortOrderType } from '@/shared/types';
import { useDebouce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleTypeTabs } from '@/entities/Article/ui/ArticleTypeTabs';
import { HStack } from '@/shared/ui/Stack';
import { ARTICLE_SORT_FIELD, ARTICLE_TYPE, ARTICLE_VIEW } from '@/shared/const/consts';
import {
    getArticlesPageType, getArticlesPageSearch,
    getArticlesPageOrder, getArticlesPageSort,
    getArticlesPageView,
} from '../../../model/selectors';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';

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
    const type = useSelector(getArticlesPageType);

    // ? Избавляясь от лишних сайд-эффектов, передаём эту функцию в каждый обработчик;
    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebouce(fetchData, 500);

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
        // ? Подгрузка данных будет происходит с использованием debounce, а ввод текста будет без задержки;
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ARTICLE_TYPE) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div
            className={classNames('', {}, [className])}
        >
            <HStack
                align="center"
                justify="between"
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
            </HStack>
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
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
};
