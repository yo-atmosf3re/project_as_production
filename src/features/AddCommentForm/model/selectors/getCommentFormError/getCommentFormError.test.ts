import { StateSchema } from 'app/providers/StoreProvider';
import { getCommentFormError } from './getCommentFormError';

describe('getCommentFormError', () => {
    test('Should return state with "error" value', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: 'Error',
            },
        };

        expect(getCommentFormError(state as StateSchema)).toEqual(
            'Error',
        );
    });

    test('Should return undefined because of state is empty', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getCommentFormError(state as StateSchema)).toEqual(undefined);
    });
});
