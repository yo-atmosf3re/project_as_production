import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticlesPageOrder } from './getArticlesPageOrder';

describe('getArticlesPageOrder', () => {
    test('Should return part of state with order', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                order: 'desc',
            },
        };

        expect(getArticlesPageOrder(state as StateSchema)).toEqual(
            'desc',
        );
    });

    test('Should return "asc" if state or selector\'s value is equal undefined', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticlesPageOrder(state as StateSchema)).toEqual('asc');
    });
});
