import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollRestoration } from './getScrollRestoration';

describe('getScrollRestoration', () => {
    test('Should return part of state with scroll object', () => {
        const state: DeepPartial<StateSchema> = {
            scrollRestoration: {
                scroll: {
                    article: 1000,
                },
            },
        };

        expect(getScrollRestoration(state as StateSchema)).toEqual(
            {
                article: 1000,
            },
        );
    });

    test('Should return undefined with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getScrollRestoration(state as StateSchema)).toEqual(undefined);
    });
});
