import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { Skeleton } from 'shared/ui/Skeleton';
import {
    ARTICLE_VIEW,
} from '../../../model/types/article';
import cls from '../../ArticleListItem/ui/ArticleListItem.module.scss';

interface ArticleListItemSkeletonPropsI {
    className?: string;
    view: ARTICLE_VIEW;
}
/**
 * Компонента, которая является скелетоном для карточек статьи из списка статей, которые отрисовываются в ArticleList во время загрузки;
 * @param className
 * @param view - тип отображения скелетонов в списке ArticleList, для доступа используется enum ARTICLE_VIEW;
 */
export const ArticleListItemSkeleton: React.FC<ArticleListItemSkeletonPropsI> = ({
    className,
    view,
}) => {
    if (view === 'BIG') {
        return (
            <div
                className={classNames(cls['article-item'], {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton
                            height={30}
                            width={30}
                            border="50%"
                        />
                        <Skeleton
                            className={cls.username}
                            height={16}
                            width={150}
                        />
                        <Skeleton
                            className={cls.date}
                            height={16}
                            width={150}
                        />
                    </div>
                    <Skeleton
                        width={250}
                        height={24}
                        className={cls.title}
                    />
                    <Skeleton
                        className={cls.image}
                        height={200}
                    />
                    <div className={cls.footer}>
                        <Skeleton
                            height={36}
                            width={200}
                        />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div
            className={classNames(cls['article-item'], {}, [className, cls[view]])}
        >
            <Card
                className={cls.card}
            >
                <div className={cls['image-wrapper']}>
                    <Skeleton
                        width={200}
                        height={200}
                        className={cls.image}
                    />
                </div>
                <div className={cls['info-wrapper']}>
                    <Skeleton
                        width={130}
                        height={16}
                    />
                </div>
                <Skeleton
                    className={cls.title}
                    width={150}
                    height={16}
                />
            </Card>
        </div>
    );
};
