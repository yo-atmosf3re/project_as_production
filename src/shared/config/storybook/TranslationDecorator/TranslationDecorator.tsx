/* eslint-disable i18next/no-literal-string */
import { Suspense } from 'react';
import { Story } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';

/**
 * Декоратор, добавляющий возможность использовать переводы в сторисах;
 * @param StoryComponent
 */
export const TranslationDecorator = (StoryComponent: Story) => (
    <I18nextProvider i18n={i18n}>
        <Suspense fallback="Loading translation...">
            <StoryComponent />
        </Suspense>
    </I18nextProvider>
);
