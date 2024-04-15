import React, { memo } from 'react';
import { ArticleFilters } from '@/widgets/ArticleFilters';
import { useArticleFilters } from '../../../lib/hooks/useArticleFilters';

interface FiltersContainerPropsI {
    className?: string;
}

/**
 * Контейнер, который декомпозирует логику и отрисовку компоненты c различными фильтрами для статей;
 * @param className
 */
export const FiltersContainer: React.FC<FiltersContainerPropsI> = memo(
    ({ className }) => {
        const {
            onChangeOrder,
            onChangeSearch,
            onChangeSort,
            onChangeType,
            order,
            search,
            sort,
            type,
        } = useArticleFilters();

        return (
            <ArticleFilters
                className={className}
                onChangeOrder={onChangeOrder}
                onChangeSearch={onChangeSearch}
                onChangeSort={onChangeSort}
                onChangeType={onChangeType}
                order={order}
                search={search}
                sort={sort}
                type={type}
            />
        );
    },
);
