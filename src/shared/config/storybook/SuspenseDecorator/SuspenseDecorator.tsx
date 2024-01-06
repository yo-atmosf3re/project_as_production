import { Story } from '@storybook/react';
import { Suspense } from 'react';

/**
 * Оборачивает каждый сторис в Suspense реакта;
 * @param StoryComponent
 */
export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
