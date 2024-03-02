import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPagePropsI {
    className?: string;
}

/**
 * Страница, предоставляющая возможность редактировать статьи или создавать новые. Вызывается при нажатии соответствующих кнопок в `ArticleDetailsPage`;
 * @param className
 */
const ArticleEditPage: React.FC<ArticleEditPagePropsI> = ({ className }) => {
    const { t } = useTranslation('article');
    // ? Получаем id из URL;
    const { id } = useParams<{ id: string }>();
    // ? Проверяем наличие этого id;
    const isEdit = Boolean(id);

    // todo Доделать функционал данной страницы: добавить фичи/виджеты (создание/редактирование статьи, запросы на сервер, селекторы, сервисы и так далее);
    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit
                ? t(`Редактирование статьи с ID = ${id}`)
                : t('Создание новой статьи')}
        </Page>
    );
};

export default ArticleEditPage;
