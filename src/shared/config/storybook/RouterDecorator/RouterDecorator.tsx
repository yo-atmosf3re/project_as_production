import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Оборачивает каждый сторис в роуты, это нужно там где используется Link из react-router-dom
 * @param StoryComponent
 * @returns `StoryComponent`
 */
export const RouterDecorator = (StoryComponent: Story) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
