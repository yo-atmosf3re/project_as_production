import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ARTICLE_VIEW, ArticleViewSelector } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Card } from 'shared/ui/Card';
import { Input } from 'shared/ui/Input';
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

    const onChangeView = useCallback((view: ARTICLE_VIEW) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);
    const view = useSelector(getArticlesPageView);

    return (
        <div
            className={classNames(cls['articles-page_filters'], {}, [className])}
        >
            <div
                className={cls['sort-wrapper']}
            >
                <ArticleViewSelector
                    view={view}
                    onViewClickHandler={onChangeView}
                />
                <ArticleViewSelector />
            </div>
            <Card
                className={cls.search}
            >
                <Input
                    placeholder={
                        t('Поиск')
                    }
                />
            </Card>
        </div>
    );
};
