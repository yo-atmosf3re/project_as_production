import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ARTICLE_SORT_FIELD, ARTICLE_TYPE } from '@/shared/const/consts';
import { SortOrderType } from '@/shared/types';
import { Input } from '@/shared/ui/redesigned/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticleFiltersPropsI {
    className?: string;
    sort: ARTICLE_SORT_FIELD;
    order: SortOrderType;
    type: ARTICLE_TYPE;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrderType) => void;
    onChangeSort: (newSort: ARTICLE_SORT_FIELD) => void;
    onChangeType: (type: ARTICLE_TYPE) => void;
}

/**
 * Компонент, который отрисовывает различную фильтрацию для статей;
 * @param className
 */
export const ArticleFilters: React.FC<ArticleFiltersPropsI> = memo(
    ({
        className,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        order,
        search,
        sort,
        type,
    }) => {
        const { t } = useTranslation('article');

        return (
            <Card
                className={classNames(cls['article-filters'], {}, [className])}
                padding="24"
            >
                <VStack gap="32">
                    <Input
                        value={search}
                        onChange={onChangeSearch}
                        placeholder={t('Поиск')}
                    />
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeSort={onChangeSort}
                        onChangeOrder={onChangeOrder}
                    />
                    <ArticleTypeTabs
                        value={type}
                        onChangeType={onChangeType}
                        className={cls.tabs}
                    />
                </VStack>
            </Card>
        );
    },
);
