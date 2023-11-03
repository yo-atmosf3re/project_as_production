import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited } from '../../selectors/getArticlesPageInited/getArticlesPageInited';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('initArticlesPage', () => {
    test('CreateAsynThunk function initArticlesPage should be called, _inited should be changed on true after that initArticlesPage has been called', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 4,
                isLoading: false,
                hasMore: true,
                _inited: false,
            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toHaveBeenCalled();
    });

    test('CreateAsynThunk function initArticlesPage should be called, but application already initialiazed because _inited value has been true, fetchArticlesList function will not be called', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 4,
                isLoading: false,
                hasMore: true,
                _inited: true,
            },
        });
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    // test('Function fetchArticlesList has been not called, because hasMore it\'s false', async () => {
    //     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
    //         articlesPage: {
    //             page: 2,
    //             ids: [],
    //             entities: {},
    //             limit: 5,
    //             isLoading: false,
    //             hasMore: false,
    //         },
    //     });
    //     await thunk.callThunk();

    //     // ? Функция dispatch вызывается всего лишь два раза, потому что здесь не срабатывает условие из fetchNextArticlesPage, внутри которого, при успешном hasMore и неуспешном isLoading, вызываются остальные две функции dispatch;
    //     expect(thunk.dispatch).toBeCalledTimes(2);
    //     // ? По причинам, которые описаны выше, функция fetchArticlesList не вызывается;
    //     expect(fetchArticlesList).not.toHaveBeenCalled();
    // });

    // test('Function fetchArticlesList has been not called, because isLoading it\'s true', async () => {
    //     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
    //         articlesPage: {
    //             page: 2,
    //             ids: [],
    //             entities: {},
    //             limit: 5,
    //             isLoading: true,
    //             hasMore: true,
    //         },
    //     });
    //     await thunk.callThunk();

    //     expect(thunk.dispatch).toBeCalledTimes(2);
    //     // ? Во время загрузки функция fetchArticlesList не может быть вызвана;
    //     expect(fetchArticlesList).not.toHaveBeenCalled();
    // });
});
