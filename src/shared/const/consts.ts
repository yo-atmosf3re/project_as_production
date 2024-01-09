/**
 * Типы валидационных ошибок;
 */
export enum VALIDATE_PROFILE_ERROR {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

/**
 * Роли для пользователя;
 */
export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER'
}/**

/**
 * Перечисление видов блоков в статье;
 * @param CODE - блок с кодом;
 * @param IMAGE - блок с изображением;
 * @param TEXT - блок с текстом;
 */
export enum ARTICLE_BLOCK_TYPE {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT'
}

/**
 * Перечисление полей, по которым будет воспроизводиться сортировка статей;
 * @param VIEWS - сортировка по просмотрам;
 * @param TITLE - сортировка по названию статьи;
 * @param CREATED - сортировка по дате создания;
 */
export enum ARTICLE_SORT_FIELD {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createdAt'
}

/**
 * Типы статей;
 * @param ALL - статьи по всем темам;
 * @param IT - информационные технологии;
 * @param SCIENCE - наука;
 * @param ECONOMICS - экономика;
 */
export enum ARTICLE_TYPE {
    ALL = 'all',
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS'
}

/**
 * Перечисление, которое отвечает за выбор отображения статей;
 * @param BIG - отображение в виде списка;
 * @param SMALL - отображение в виде плиток;
 */
export enum ARTICLE_VIEW {
    BIG = 'BIG',
    SMALL = 'SMALL',
}

/**
 * Список стран;
 */
export enum COUNTRY {
    RUSSIA = 'Russia',
    BELARUS = 'Belarus',
    UKRAIN = 'Ukrain',
    KAZAKHSTAN = 'Kazakhstan',
    ARMENIA = 'Armenia'
}

/**
 * Список валют;
 */
export enum CURRENCY {
    'RUB' = 'RUB',
    'EUR' = 'EUR',
    'USD' = 'USD'
}
