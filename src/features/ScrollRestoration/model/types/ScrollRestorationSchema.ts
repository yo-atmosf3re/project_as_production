/**
 * Типизация для свойства `scroll` для типа `ScrollRestorationSchema`. Свойством будет являться адрес страницы, а значением будет являться позиция скролла в пиксилях;
 * `Record<Адрес страницы, позиция скролла>`
 */
export type ScrollSchema = Record<string, number>;

export interface ScrollRestorationSchema {
    scroll: ScrollSchema;
}
