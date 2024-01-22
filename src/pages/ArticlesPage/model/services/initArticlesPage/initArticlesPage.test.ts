import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initArticlesPage } from './initArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

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
        await thunk.callThunk(new URLSearchParams());
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
        await thunk.callThunk(new URLSearchParams());
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
