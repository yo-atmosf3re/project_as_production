import 'app/styles/index.scss';
import { Story } from '@storybook/react';

// ? Декоратор для определения главного стиля index.scss в сторисы;
export const StyleDecorator = (story: () => Story) => story();
