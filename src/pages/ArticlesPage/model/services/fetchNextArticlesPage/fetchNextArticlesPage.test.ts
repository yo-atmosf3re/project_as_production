import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// ? Обязательно мокаем модуль;
jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage', () => {
    test('CreateAsynThunk function fetchNextArticlesPage should be called 4 times, value page variables has been succesful changed', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });
        await thunk.callThunk();

        // ? Проверка на количество количество вызываемых раз функции dispatch: четыре раза потому, что вызывается fulfilled, pending и два раза dispatch внутри fetchNextArticlesPage;
        expect(thunk.dispatch).toBeCalledTimes(4);
        // ? Проверяем правильность аргумента, который передан в fetchArticlesList: у page значение 3, потому что в момент инициализации тестового стейта у page значение 2, а при вызове fetchNextArticlesPage вызывается fetchArticlesList, который увелчивает значение page на 1;
        // ! Теперь в эту функцию никакие аргументы не передаются!
        expect(fetchArticlesList).toHaveBeenCalledWith({});
    });

    test("Function fetchArticlesList has been not called, because hasMore it's false", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });
        await thunk.callThunk();

        // ? Функция dispatch вызывается всего лишь два раза, потому что здесь не срабатывает условие из fetchNextArticlesPage, внутри которого, при успешном hasMore и неуспешном isLoading, вызываются остальные две функции dispatch;
        expect(thunk.dispatch).toBeCalledTimes(2);
        // ? По причинам, которые описаны выше, функция fetchArticlesList не вызывается;
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test("Function fetchArticlesList has been not called, because isLoading it's true", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: true,
            },
        });
        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        // ? Во время загрузки функция fetchArticlesList не может быть вызвана;
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
