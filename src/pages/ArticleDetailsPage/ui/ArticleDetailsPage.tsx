import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPagePropsI {
    className?: string;
}

// ? Страница полной статьи, с блоками, комментариями, содержимым;
const ArticleDetailsPage: React.FC<ArticleDetailsPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    return (
        <div
            className={classNames(cls['article-detials'], {}, [className])}
        >
            ArticleDetailsPage
        </div>
    );
};

export default memo(ArticleDetailsPage);
