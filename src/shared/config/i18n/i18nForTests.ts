import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ? Настройка библиотеки i18n для тестов jest, многие поля схожи с основной настройкой данной библиотеки;

// ! Старый конфиг i18next для тестов без создания нового инстанса;
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

// ! Другой вариант конфига i18next для тестов с созданием нового инстанса i18next, чтобы не было ошибок связанных с тем, что используется больше, чем одна инициализация i18next;
// const i18n = i18next.createInstance();
// i18next
//     .use(initReactI18next)
//     .init({
//         lng: 'ru',
//         fallbackLng: 'ru',

//         debug: false,

//         interpolation: {
//             escapeValue: false,
//         },

//         resources: { ru: { translations: {} } },
//     });

// export default i18n;
