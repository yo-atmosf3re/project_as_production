import { THEME } from "@/shared/const/consts";

/**
 * Уникальные настройки для каждого пользователя, которые хранятся в базе данных в свойстве `jsonSettings` у каждого объекта `users`. В качестве значений объекта `jsonSettings` могут выступать какие-либо флаги или конкретные значения;
 * @param theme - цветовая тема, которая установлена у пользователя;
 * @param isFirstVisit - флаг первого посещения;
 * @param settingsPageHasBeenOpen
 */
export interface JsonSettingsI {
    theme?: THEME;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
}