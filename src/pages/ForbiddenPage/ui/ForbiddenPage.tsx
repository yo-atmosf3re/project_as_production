import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenPagePropsI {
    className?: string;
}

/**
 * Страница, которая отрисовывается в случае, если у  пользователя нет прав доступа к какой-либо странице;
 * @param className
 */
export const ForbiddenPage: React.FC<ForbiddenPagePropsI> = ({ className }) => {
    const { t } = useTranslation('notFoundPage');
    return (
        <Page
            data-testid="ForbiddenPage"
            className={classNames(cls.ForbiddenPage, {}, [className])}
        >
            {t('У Вас нет доступа к этой странице!')}
        </Page>
    );
};
