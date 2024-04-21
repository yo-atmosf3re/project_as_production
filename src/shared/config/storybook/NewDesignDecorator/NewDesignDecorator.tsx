import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

/**
 * Декоратор, который устанавливает `isAppRedesigned` фича-флаг со значением `true` - это решает проблему с разными классами, которые могут некорректно определиться в одних и тех же сторисах;
 * @param StoryComponent
 */
export const NewDesignDecorator = (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};
