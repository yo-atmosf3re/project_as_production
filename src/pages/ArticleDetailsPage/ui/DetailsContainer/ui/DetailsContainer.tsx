import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetails } from '@/entities/Article';

interface DetailsContainerPropsI {
    className?: string;
}

/**
 * Обёртка для `ArticleDetailsPage` для удобного соответствия с дизайн-системой;
 * @param className
 */
export const DetailsContainer: React.FC<DetailsContainerPropsI> = memo(
    ({ className }) => {
        const { id } = useParams<{ id: string }>();
        return (
            <Card
                max
                className={className}
                padding="24"
                border="round"
            >
                <ArticleDetails id={id} />
            </Card>
        );
    },
);
