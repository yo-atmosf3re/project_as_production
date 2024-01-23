import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { StarRating } from '@/shared/ui/StarRating';
import { RatingCard } from '@/entities/Rating';

/**
 * Компонента, которая является главной страницей;
 */
const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {
                t('Главная страница')
            }
            <RatingCard
                title="Как Вам статья?"
                feedbackTitle="Оставьте отзыв о статье"
                hasFeedback
            />
        </Page>
    );
};

export default MainPage;
