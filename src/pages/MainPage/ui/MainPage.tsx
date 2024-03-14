import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

/**
 * Компонента, которая является главной страницей;
 */
const MainPage = () => {
    const { t } = useTranslation('main');

    return <Page data-testid="MainPage">{t('Главная страница')}1111</Page>;
};

export default MainPage;
