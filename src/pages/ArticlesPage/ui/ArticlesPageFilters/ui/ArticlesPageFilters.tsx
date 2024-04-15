import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticlesPageFilters.module.scss';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersPropsI {
    className?: string;
}

export const ArticlesPageFilters: React.FC<ArticlesPageFiltersPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    
    const {
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        onChangeView,
        order,
        search,
        sort,
        type,
        view,
    } = useArticleFilters();

    return (
        <div className={classNames('', {}, [className])}>
            <HStack
                align="center"
                justify="between"
            >
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClickHandler={onChangeView}
                />
            </HStack>
            <Card className={cls.search}>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Поиск')}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
};
