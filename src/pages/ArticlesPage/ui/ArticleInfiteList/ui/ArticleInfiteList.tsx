import { ArticleList } from '@/entities/Article';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/Text';
import { getArticles } from '../../../model/slice/articlesPageSlice';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../../model/selectors';

interface ArticleInfiteListPropsI {
    className?: string;
}

/**
 * Компонента, внутри которой декомпозирована логика по отрисовке списка со статьями;
 * @param className
 */
export const ArticleInfiteList: React.FC<ArticleInfiteListPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) {
        return <Text title={t('Ошибка при загрузке статей')} />;
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    );
};
