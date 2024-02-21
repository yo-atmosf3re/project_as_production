// ? Это не бизнес код, поэтому добавление исключения вполне себе оправданное действие;
// eslint-disable-next-line yo-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

/**
 * Декоратор для определения главного стиля index.scss в сторисы;
 * @param story
 */
export const StyleDecorator = (story: () => Story) => story();
