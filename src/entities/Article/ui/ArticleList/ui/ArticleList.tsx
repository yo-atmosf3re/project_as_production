import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ARTICLE_VIEW, ArticleI } from '../../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../../ArticleListItem';

interface ArticleListPropsI {
    className?: string;
    articles: ArticleI[];
    isLoading?: boolean;
    view?: ARTICLE_VIEW;
}

/**
 * Компонента, которая отрисовывает список статей.
 * @param className
 * @param articles - массив со статьями;
 * @param isLoading - состояние загрузки;
 * @param view - тип отображения списка со статьями (по-умолчанию SMALL), для доступа используется enum ARTICLE_VIEW;
*/
export const ArticleList: React.FC<ArticleListPropsI> = ({
    className,
    articles, isLoading,
    view = ARTICLE_VIEW.SMALL,
}) => {
    const { t } = useTranslation();

    const renderArticle = (article: ArticleI) => (
        <ArticleListItem
            article={article}
            view={view}
        />
    );

    return (
        <div
            className={classNames(cls.ArticleList, {}, [className])}
        >
            {
                articles.length > 0
                    ? articles.map(renderArticle)
                    : null
            }
        </div>
    );
};
