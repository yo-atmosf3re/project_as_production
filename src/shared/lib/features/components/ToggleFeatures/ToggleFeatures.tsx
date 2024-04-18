import React, { ReactElement } from 'react';
import { FeatureFlagsI } from '../../../../types/featureFlags';
import { getFeatureFlags } from '../../lib/setGetFeatures';

interface ToggleFeaturesPropsI {
    feature: keyof FeatureFlagsI;
    on: ReactElement;
    off: ReactElement;
}

/**
 * Компонента, позволяющая удобно отрисовывать компоненты по фича-флагам. Если флаг включен (существует ли такой флаг у клиента), то отрисовывается `on`, иначе `off`;
 * @param feature - ключ фичи;
 * @param on - компонента, которая отрисовывается при наличии переданного фича-флага;
 * @param off - компонента, которая отрисовывается при отсутствии переданного фича-флага;
 * @returns
 */
export const ToggleFeatures: React.FC<ToggleFeaturesPropsI> = ({
    feature,
    off,
    on,
}) => {
    if (getFeatureFlags(feature)) {
        return on;
    }

    return off;
};
