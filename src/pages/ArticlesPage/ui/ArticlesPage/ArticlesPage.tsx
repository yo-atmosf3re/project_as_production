import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters';
import { ArticleInfiteList } from '../ArticleInfiteList';

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
    const dispatch = useAppDispatch();
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
                <ArticleInfiteList
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
