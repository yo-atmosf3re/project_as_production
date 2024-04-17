import React, { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters';
import { ArticleInfiteList } from '../ArticleInfiteList';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer';

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
const ArticlesPage: React.FC<ArticlesPagePropsI> = ({ className }) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const deprecatedContent = (
        <Page
            onScrollEnd={onLoadNextPart}
            className={classNames(cls['articles-page'], {}, [className])}
            data-testid="ArticlesPage"
        >
            <ArticlesPageFilters />
            <ArticleInfiteList className={cls.list} />
            <ArticlePageGreeting />
        </Page>
    );

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                    content={
                        <Page
                            onScrollEnd={onLoadNextPart}
                            className={classNames(cls['ap-redesigned'], {}, [
                                className,
                            ])}
                            data-testid="ArticlesPage"
                        >
                            <ArticleInfiteList className={cls.list} />
                            <ArticlePageGreeting />
                        </Page>
                    }
                />
            }
            off={deprecatedContent}
        />
    );

    return (
        <DynamicModuleLoader
            removeAfterUnmount={false}
            reducers={INITIAL_REDUCERS}
        >
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
