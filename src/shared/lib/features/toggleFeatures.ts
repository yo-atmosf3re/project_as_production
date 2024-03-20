import { FeatureFlagsI } from "@/shared/types/featureFlags";
import { getFeatureFlags } from "./setGetFeatures";

interface ToggleFeaturesOptionsI<T> {
    name: keyof FeatureFlagsI;
    on: () => T;
    off: () => T;
}

/**
 * Функция, которая позволяет стандартизировать работу с фичами. Переключает фича-флаги в зависимости от их наличия в сессии у пользователя;
 */
export function toggleFeatures<T>({off, on, name}: ToggleFeaturesOptionsI<T> ): T {
    if(getFeatureFlags(name)) {
        return on();
    }

    return off();
}