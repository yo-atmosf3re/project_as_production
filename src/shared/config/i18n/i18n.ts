import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// ? Настройка библиотеки i18n, здесь импортированы нужные зависимости для работы в данном приложении. Backend (i18next-http-backend) загружает переводы из файлов JSON по указаному пути (loadPath). Для определения языка браузера используется i18next-browser-languagedetector;
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // ? В случае отсутствия перевода для выбранного языка используется резервный язык 'ru';
        fallbackLng: 'ru',
        debug: __IS_DEV__,
        // ? Для интерполяции;
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
