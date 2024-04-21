import { Story } from '@storybook/react';
import { FeatureFlagsI } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

/**
 * Декоратор, который позволяет определять фича флаги в сторисах;
 * @param StoryComponent
 * @returns `StoryComponent`
 */
export const FeaturesFlagsDecorator =
    (features: FeatureFlagsI) => (StoryComponent: Story) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
