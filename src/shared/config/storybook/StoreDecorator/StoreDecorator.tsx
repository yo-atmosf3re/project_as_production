import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

// ? StoreDecorator нужен для того, чтобы для каждой сторис задавать какое-то дефолтное значение стейта, благодаря переданному в эту функцию стейту. Пример где может пригодиться: отображать загрузку, ошибку, другие индикации, для переопредления полей;
// ? Здесь так же используется DeepPartical, потому что в обычном StateSchema может быть слишком много ненужных полей;
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>
);
