import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import { Button, BUTTON_THEME } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/getCanEditArticle/getCanEditArticle';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderPropsI {
    className?: string;
}

/**
 * Компонента, являющаяся частью `ArticleDetailsPage`, которая отображает навигационные кнопки внутри каждой конкретной статьи - "Вернуться назад", "Редактировать" (редактирование доступно только для автора статьи), "Отмена" и так далее;
 * @param className
 */
export const ArticleDetailsPageHeader: React.FC<ArticleDetailsPageHeaderPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(ROUTES_PATH.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${ROUTES_PATH.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <div
            className={classNames(cls['article-details_header'], {}, [className])}
        >
            <Button
                theme={BUTTON_THEME.OUTLINE}
                onClick={onBackToList}
            >
                {
                    t('Назад к списку')
                }
            </Button>
            {
                canEdit
                    ? (
                        <Button
                            className={cls['edit-button']}
                            theme={BUTTON_THEME.OUTLINE}
                            onClick={onEditArticle}
                        >
                            {
                                t('Редактировать')
                            }
                        </Button>
                    )
                    : null
            }
        </div>
    );
};
