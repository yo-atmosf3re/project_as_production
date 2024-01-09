import { ARTICLE_BLOCK_TYPE, ARTICLE_TYPE } from 'shared/const/consts';
import { UserI } from '../../../User/models/types/user';

/**
 * Интерфейс базового блока статьи;
 * @interface
 * @param id - уникальный идентификатор блока;
 * @param type - тип блока из перечисления ARTICLE_BLOCK_TYPE;
 */
export interface ArticleBlockBaseI {
    id: string;
    type: ARTICLE_BLOCK_TYPE; // тип блока
}

/**
 * Интерфейс блока статьи с кодом;

 * @extends {ArticleBlockBaseI} - расширяется от базового класса блока статьи, где в качестве свойств указаны id, type;
 * @param type - тип блока CODE;
 * @param code - сам код, который будет помещён в блок;
 */
export interface ArticleCodeBlockI extends ArticleBlockBaseI {
    type: ARTICLE_BLOCK_TYPE.CODE;
    code: string;
}

/**
 * Интерфейс блока статьи с изображением;
 * @extends {ArticleBlockBaseI} - расширяется от базового класса блока статьи, где в качестве свойств указаны id, type;
 * @param type - тип блока IMAGE;
 * @param title - заголовок для изображения;
 * @param src - путь до изображения;
 */
export interface ArticleImageBlockI extends ArticleBlockBaseI {
    type: ARTICLE_BLOCK_TYPE.IMAGE;
    title: string;
    src: string;
}

/**
 * Интерфейс блока статьи с текстом;
 * @extends {ArticleBlockBaseI} - расширяется от базового класса блока статьи, где в качестве свойств указаны id, type;
 * @param type - тип блока TEXT;
 * @param paragraphs - массив с параграфами;
 * @param title - заголовок для текста, может не передаваться;
 */
export interface ArticleTextBlockI extends ArticleBlockBaseI {
    type: ARTICLE_BLOCK_TYPE.TEXT;
    paragraphs: string[];
    title?: string;
}

/**
 * Тип блока статьи - код, текст, изображение;
 * @type ArticleCodeBlockI | ArticleImageBlockI | ArticleTextBlockI;
 */
export type ArticleBlockI = ArticleCodeBlockI | ArticleImageBlockI | ArticleTextBlockI;

/**
 * Интерфейс статьи;
 *  @param id - уникальный идентификатор статьи;
    @param title - заголовок;
    @param user - информация о пользователе;
    @param subtitle - подзаголовок;
    @param img - путь до изображения;
    @param views - количество просмотров;
    @param createdAt - дата создания;
    @param type - типы статьи;
    @param blocks - блоки статьи;
 */
export interface ArticleI {
    id: string;
    title: string;
    user: UserI;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ARTICLE_TYPE[];
    blocks: ArticleBlockI[];
}
