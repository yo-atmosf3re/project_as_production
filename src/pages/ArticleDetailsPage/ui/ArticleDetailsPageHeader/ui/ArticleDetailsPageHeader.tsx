import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, BUTTON_THEME } from '@/shared/ui/deprecated/Button';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { getCanEditArticle } from '../../../model/selectors/getCanEditArticle/getCanEditArticle';
import cls from './ArticleDetailsPageHeader.module.scss';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/consts';

interface ArticleDetailsPageHeaderPropsI {
    className?: string;
}

/**
 * Компонента, являющаяся частью `ArticleDetailsPage`, которая отображает навигационные кнопки внутри каждой конкретной статьи - "Вернуться назад", "Редактировать" (редактирование доступно только для автора статьи), "Отмена" и так далее;
 * @param className
 */
export const ArticleDetailsPageHeader: React.FC<
    ArticleDetailsPageHeaderPropsI
> = ({ className }) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    return (
        <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
        >
            <Button
                theme={BUTTON_THEME.OUTLINE}
                onClick={onBackToList}
            >
                {t('Назад к списку')}
            </Button>
            {canEdit ? (
                <Button
                    className={cls['edit-button']}
                    theme={BUTTON_THEME.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            ) : null}
        </HStack>
    );
};
