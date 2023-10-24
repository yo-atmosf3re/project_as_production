import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPagePropsI {
    className?: string;
}

// ? Страница полной статьи, с блоками, комментариями, содержимым;
const ArticleDetailsPage: React.FC<ArticleDetailsPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div
                className={classNames(cls['article-detials'], {}, [className])}
            >
                {
                    t('Статья не найдена!')
                }
            </div>
        );
    }

    return (
        <div
            className={classNames(cls['article-detials'], {}, [className])}
        >
            <ArticleDetails
                id={id}
            />
        </div>
    );
};

export default memo(ArticleDetailsPage);
