import { FeatureFlagsI } from "@/shared/types/featureFlags";

/**
 * Хранение фича-флагов. В ходе текущей сессии фичи не меняются, поэтому данный флаг не является реактивным (при измении этих флагов перерисовка в рамках одной сессии не произойдёт);
 */
let featureFlags: FeatureFlagsI;

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