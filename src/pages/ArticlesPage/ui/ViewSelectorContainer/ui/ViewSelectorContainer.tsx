import React, { memo } from 'react';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerPropsI {
    className?: string;
}

/**
 * Контейнер, который декомпозирует логику и отрисовку компоненты-селектора по переключению вида отображения статей;
 * @param className
 */
export const ViewSelectorContainer: React.FC<ViewSelectorContainerPropsI> =
    memo(({ className }) => {
        const { onChangeView, view } = useArticleFilters();

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClickHandler={onChangeView}
            />
        );
    });
