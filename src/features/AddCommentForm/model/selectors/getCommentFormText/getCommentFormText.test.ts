import { StateSchema } from 'app/providers/StoreProvider';
import { getCommentFormText } from './getCommentFormText';

describe('getCommentFormText', () => {
    test('Should return state with "text" value', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'Text',
            },
        };

        expect(getCommentFormText(state as StateSchema)).toEqual(
            'Text',
        );
    });

    test('Should return undefined because of state is empty', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getCommentFormText(state as StateSchema)).toEqual(undefined);
    });
});
