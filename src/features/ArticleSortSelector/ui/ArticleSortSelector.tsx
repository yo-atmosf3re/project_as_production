import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOptionI } from '@/shared/ui/deprecated/Select';
import { SortOrderType } from '@/shared/types';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ARTICLE_SORT_FIELD } from '@/shared/const/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorPropsI {
    className?: string;
    sort: ARTICLE_SORT_FIELD;
    order: SortOrderType;
    onChangeOrder: (newOrder: SortOrderType) => void;
    onChangeSort: (newSort: ARTICLE_SORT_FIELD) => void;
}

/**
 * Компонента, которая содержит в себе селекторы с выбором сортировки. Все данные в эту компоненту приходят из `ArticlesPage`;
 * @param className
 * @param sort - вид сортировки;
 * @param order - порядок сортировки;
 * @param onChangeOrder - обработчик порядка сортировки;
 * @param onChangeSort - обработчик вида сортировки;
 */
export const ArticleSortSelector: React.FC<ArticleSortSelectorPropsI> = ({
    className,
    order,
    sort,
    onChangeOrder,
    onChangeSort,
}) => {
    const { t } = useTranslation('article');

    const orderOptions = useMemo<SelectOptionI<SortOrderType>[]>(
        () => [
            {
                value: 'asc',
                content: t('возрастанию'),
            },
            {
                value: 'desc',
                content: t('убыванию'),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOptionI<ARTICLE_SORT_FIELD>[]>(
        () => [
            {
                value: ARTICLE_SORT_FIELD.CREATED,
                content: t('дате создания'),
            },
            {
                value: ARTICLE_SORT_FIELD.TITLE,
                content: t('названию'),
            },
            {
                value: ARTICLE_SORT_FIELD.VIEWS,
                content: t('просмотрам'),
            },
        ],
        [t],
    );

    const deprecatedArticleSortSelector = (
        <HStack
            gap="32"
            align="center"
            className={classNames('', {}, [className])}
        >
            <Select<ARTICLE_SORT_FIELD>
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
                label={t('Сортировать ПО')}
            />
            <Select<SortOrderType>
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                label={t('по')}
                className={cls.order}
            />
        </HStack>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div className={classNames('', {}, [className])}>
                    <VStack gap="8">
                        <Text text={t('Сортировать по:')} />
                        <ListBox
                            items={sortFieldOptions}
                            value={sort}
                            onChange={onChangeSort}
                        />
                        <ListBox
                            items={orderOptions}
                            value={order}
                            onChange={onChangeOrder}
                        />
                    </VStack>
                </div>
            }
            off={deprecatedArticleSortSelector}
        />
    );
};
