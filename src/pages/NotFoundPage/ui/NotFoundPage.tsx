import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPagePropsI {
   className?: string;
}

/**
 * Компонента, которая отображается в случае, если какая-либо страница не найдена;? Компонента, которая отображается в случае, если какая-либо страница не найдена;
 * @param className
 */
export const NotFoundPage: React.FC<NotFoundPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('notFoundPage');
    return (
        <Page className={classNames(cls.notFoundPage, {}, [className])}>
            {
                t('Страница не найдена')
            }
        </Page>
    );
};
