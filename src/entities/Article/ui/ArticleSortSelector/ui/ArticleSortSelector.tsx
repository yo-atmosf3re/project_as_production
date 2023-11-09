import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOptionI } from 'shared/ui/Select';
import { ARTICLE_SORT_FIELD } from 'entities/Article';
import { SortOrderType } from 'shared/types';
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
}) => {
    const { t } = useTranslation('article');

    const orderOptions = useMemo<SelectOptionI[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOptionI[]>(() => [
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
    ], [t]);

    return (
        <div
            className={classNames(cls.ArticleSortSelector, {}, [className])}
        >
            <Select
                options={sortFieldOptions}
                label={
                    t('Сортировать ПО')
                }
            />
            <Select
                options={orderOptions}
                label={
                    t('по')
                }
            />
        </div>
    );
};
