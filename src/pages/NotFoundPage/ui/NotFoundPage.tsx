import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { HStack } from '@/shared/ui/Stack';
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
        <Page
            className={classNames(cls['nf-page'], {}, [className])}
            data-testid="NotFoundPage"
        >
            <HStack
                justify="center"
                align="center"
            >
                {
                    t('Страница не найдена')
                }
            </HStack>
        </Page>
    );
};
