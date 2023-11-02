/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ARTICLE_VIEW, ArticleI } from '../../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../../ArticleListItem';
import { ArticleListItemSkeleton } from '../../ArticleListItemSkeleton';

interface ArticleListPropsI {
    className?: string;
    articles: ArticleI[];
    isLoading?: boolean;
    view?: ARTICLE_VIEW;
}

const GET_SKELETONS = (view: ARTICLE_VIEW) => (
    new Array(view === ARTICLE_VIEW.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ))
);

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
            className={cls.card}
            key={article.id}
        />
    );

    return (
        <div
            className={classNames(cls['article-list'], {}, [className, cls[view]])}
        >
            {
                articles.length > 0
                    ? articles.map(renderArticle)
                    : null
            }
            {
                isLoading
                    ? GET_SKELETONS(view)
                    : null
            }
        </div>
    );
};
