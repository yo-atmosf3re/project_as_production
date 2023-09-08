import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ? Настройка библиотеки i18n для тестов jest, многие поля схожи с основной настройкой данной библиотеки;
i18n
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',

        debug: false,

        interpolation: {
            escapeValue: false,
        },

        resources: { ru: { translations: {} } },
    });

export default i18n;
