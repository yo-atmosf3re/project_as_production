// ? Общие константы и енамы приложения;

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
    MANAGER = 'MANAGER',
} /**

/**
 * Перечисление видов блоков в статье;
 * @param CODE - блок с кодом;
 * @param IMAGE - блок с изображением;
 * @param TEXT - блок с текстом;
 */
export enum ARTICLE_BLOCK_TYPE {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
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
    CREATED = 'createdAt',
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
    ECONOMICS = 'ECONOMICS',
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
    ARMENIA = 'Armenia',
}

/**
 * Список валют;
 */
export enum CURRENCY {
    'RUB' = 'RUB',
    'EUR' = 'EUR',
    'USD' = 'USD',
}

/**
 * Функция, возвращающая путь для `MainPage`;
 */
export const getRouteMain = () => '/';

/**
 * Функция, возвращающая путь для `AboutPage`;
 */
export const getRouteAbout = () => '/about';

/**
 * Функция, возвращающая путь для `ProfilePage` с конкретным id;
 */
export const getRouteProfile = (id: string) => `/profile/${id}`;

/**
 * Функция, возвращающая путь для `ArticlesPage`;
 */
export const getRouteArticles = () => '/articles';

/**
 * Функция, возвращающая путь для `ArticleDetailsPage`;
 */
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;

/**
 * Функция, возвращающая путь для `ArticleEditPage`;
 */
export const getRouteArticleCreate = () => '/articles/new';

/**
 * Функция, возвращающая путь для `ArticleEditPage`;
 */
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;

/**
 * Функция, возвращающая путь для `AdminPanelPage`;
 */
export const getRouteAdminPanel = () => '/admin';

/**
 * Функция, возвращающая путь для `ForbbiedPage`;
 */
export const getRouteForbbied = () => '/forbidden';

/**
 * Список с роутами приложения;
 */
export enum APP_ROUTES {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // ? Последний маршрут;
    NOT_FOUND = 'not_found',
}

/**
 * Список с стилистическими темами в приложении;
 */
export enum THEME {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    JUNGLE = 'app_jungle_theme',
}
