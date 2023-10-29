/* eslint-disable max-len */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article';
import { ARTICLE_VIEW } from 'entities/Article/model/types/article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPagePropsI {
    className?: string;
}

/**
 * Страница со списком всех статей, содержит поиск по статьям, фильтры;
 * @param className
 */
const ArticlesPage: React.FC<ArticlesPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');

    return (
        <div
            className={classNames(cls['article-page'], {}, [className])}
        >
            <ArticleList
                isLoading
                view={ARTICLE_VIEW.BIG}
                articles={[]}
            />
        </div>
    );
};

export default memo(ArticlesPage);
