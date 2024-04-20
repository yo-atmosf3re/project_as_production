import { LAST_DESIGN_LS_KEY } from "@/shared/const/localstorage";
import { FeatureFlagsI } from "@/shared/types/featureFlags";

const defaultFeatures: FeatureFlagsI = {
    // ? Дефолтная инициализация фича флага, данные для которого берутся из LS (P.S: данные в LS сохраняются всякий раз при инициализации данных о пользователе);
    isAppRedesigned: localStorage.getItem(LAST_DESIGN_LS_KEY) === 'new',
}

/**
 * Хранение фича-флагов. В ходе текущей сессии фичи не меняются, поэтому данный флаг не является реактивным (при измении этих флагов перерисовка в рамках одной сессии не произойдёт);
 */
let featureFlags: FeatureFlagsI = {
    ...defaultFeatures
};

/**
 * Установка фича-флагов в объект;
 * @param newFeatureFlags 
 */
export function setFeatureFlags(newFeatureFlags?: FeatureFlagsI) {
    if(newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

/**
 * Получение фичи по переданному в функцию ключу;
 * @param flag
 */
export function getFeatureFlags(flag: keyof FeatureFlagsI) {
    return featureFlags[flag];
}

/**
 * Полученией всех фич;
 */
export function getAllFeatureFlags() {
    return featureFlags;
}