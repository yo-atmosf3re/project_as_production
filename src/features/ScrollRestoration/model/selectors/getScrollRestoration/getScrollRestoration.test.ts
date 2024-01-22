import { StateSchema } from '@/app/providers/StoreProvider';
import { getScrollRestoration } from './getScrollRestoration';

describe('getScrollRestoration', () => {
    test('Should return part of state with scroll object', () => {
        const state: Partial<StateSchema> = {
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
});
