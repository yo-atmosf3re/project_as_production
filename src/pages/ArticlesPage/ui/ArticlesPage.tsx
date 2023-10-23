import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPagePropsI {
    className?: string;
}

// ? Страница со списком всех статей, поиск по статьям, фильтры;
const ArticlesPage: React.FC<ArticlesPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    return (
        <div
            className={classNames(cls['article-page'], {}, [className])}
        >
            ArticlesPage
        </div>
    );
};

export default memo(ArticlesPage);
