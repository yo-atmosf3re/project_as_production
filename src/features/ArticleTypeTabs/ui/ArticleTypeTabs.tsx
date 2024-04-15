import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ARTICLE_TYPE } from '@/shared/const/consts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItemI, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsPropsI {
    className?: string;
    value: string;
    onChangeType: (type: ARTICLE_TYPE) => void;
}

/**
 * Компонента, внутри которой изолирована логика по работе с табами для сортировки статей по темам;
 * @param className
 * @param value - значение выбранного типа статьи;
 * @param onChangeType - функция, изменяющая тип статьи;
 */
export const ArticleTypeTabs: React.FC<ArticleTypeTabsPropsI> = ({
    className,
    value,
    onChangeType,
}) => {
    const { t } = useTranslation('article');

    const typeTabs = useMemo<TabItemI[]>(
        () => [
            {
                value: ARTICLE_TYPE.ALL,
                content: t('Все статьи'),
            },
            {
                value: ARTICLE_TYPE.IT,
                content: t('Айти'),
            },
            {
                value: ARTICLE_TYPE.ECONOMICS,
                content: t('Экономика'),
            },
            {
                value: ARTICLE_TYPE.SCIENCE,
                content: t('Наука'),
            },
        ],
        [t],
    );

    const onTabClickHandler = useCallback(
        (tab: TabItemI) => {
            onChangeType(tab.value as ARTICLE_TYPE);
        },
        [onChangeType],
    );

    const deprecatedArticleTypeTabs = (
        <TabsDeprecated
            onTabClick={onTabClickHandler}
            value={value}
            tabs={typeTabs}
            className={classNames('', {}, [className])}
        />
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    onTabClick={onTabClickHandler}
                    value={value}
                    tabs={typeTabs}
                    className={classNames('', {}, [className])}
                    direction="column"
                />
            }
            off={deprecatedArticleTypeTabs}
        />
    );
};
