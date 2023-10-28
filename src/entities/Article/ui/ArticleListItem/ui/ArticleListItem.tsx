import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/ui/Icon';
import { Card } from 'shared/ui/Card';
import { ARTICLE_VIEW, ArticleI } from '../../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemPropsI {
    className?: string;
    article: ArticleI;
    view: ARTICLE_VIEW;
}
/**
 * Компонента, которая является элементом списка статей, которые отрисовываются в ArticleList;
 * @param className
 * @param article - статья для отрисовки;
 * @param view - тип отображения статьи в списке ArticleList (по-умолчанию SMALL, определено из родительской компоненты), для доступа используется enum ARTICLE_VIEW;
 */
export const ArticleListItem: React.FC<ArticleListItemPropsI> = ({
    className,
    article,
    view,
}) => {
    const { t } = useTranslation();

    if (view === 'BIG') {
        return (
            <div
                className={classNames(cls['article-item'], {}, [className, cls[view]])}
            >
                {
                    article.title
                }
            </div>
        );
    }

    return (
        <div
            className={classNames(cls['article-item'], {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls['image-wrapper']}>
                    <img
                        src={article.img}
                        className={cls.image}
                        alt={article.title}
                    />
                    <Text
                        text={article.createAt}
                        className={cls.date}
                    />
                </div>
                <div className={cls['info-wrapper']}>
                    <Text
                        text={article.type.join(', ')}
                        className={cls.types}
                    />
                    <Text
                        text={String(article.views)}
                        className={cls.views}
                    />
                    <Icon
                        Svg={EyeIcon}
                    />
                </div>
                <Text
                    text={article.title}
                    className={cls.title}
                />
            </Card>
        </div>
    );
};
