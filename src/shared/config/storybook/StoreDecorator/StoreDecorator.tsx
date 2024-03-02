import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { ReducersList } from '../../../lib/components/DynamicModuleLoader/DynamicModuleLoader';

// ? Дефолтная инициализация асинхронных редьюсеров, если они не переданы в ручную при использовании декораторов;
const DEFAULT_ASYNC_REDUCERS: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

// ? StoreDecorator нужен для того, чтобы для каждой сторис задавать какое-то дефолтное значение стейта, благодаря переданному в эту функцию стейту. Пример где может пригодиться: отображать загрузку, ошибку, другие индикации, для переопредления полей;
// ? Здесь так же используется DeepPartical, потому что в обычном StateSchema может быть слишком много ненужных полей;
export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: Story) =>
        (
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
