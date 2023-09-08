import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// ? Оборачивает каждый сторис в роуты, это нужно там где используется Link из react-router-dom;
export const RouterDecorator = (story: () => Story) => (
    <BrowserRouter>
        {story()}
    </BrowserRouter>
);
