import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'entitites/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

// ? Дефолтная инициализация асинхронных редьюсеров, если они не переданы в ручную при использовании декораторов;
const DEFAULT_ASYNC_REDUCERS: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    profile: profileReducer,
};

// ? StoreDecorator нужен для того, чтобы для каждой сторис задавать какое-то дефолтное значение стейта, благодаря переданному в эту функцию стейту. Пример где может пригодиться: отображать загрузку, ошибку, другие индикации, для переопредления полей;
// ? Здесь так же используется DeepPartical, потому что в обычном StateSchema может быть слишком много ненужных полей;
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{
            ...DEFAULT_ASYNC_REDUCERS,
            ...asyncReducers,
        }}
    >
        <StoryComponent />
    </StoreProvider>
);
