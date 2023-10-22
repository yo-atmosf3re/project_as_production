import { updateProfileData } from 'entitites/Profile';
import { COUNTRY } from 'entitites/Country';
import { CURRENCY } from 'entitites/Currency';
import { profileActions, profileReducer } from './profileSlice';
import { ProfileSchema, VALIDATE_PROFILE_ERROR } from '../types/profile';

const data = {
    username: 'Alex',
    age: 28,
    country: COUNTRY.ARMENIA,
    lastname: 'Chrome',
    first: '1',
    city: '2',
    currency: CURRENCY.RUB,
};

const formData = {
    username: 'Ernesto',
    age: 18,
    country: COUNTRY.BELARUS,
    lastname: 'Chrome',
    first: '2',
    city: '3',
    currency: CURRENCY.USD,
};

// ! Тестирование extraReducers проходит так же, как и тестирование обычных редьюсеров у слайса, мы просто обращаемся к сервису, а состояние выполнения будет являться action у данного сервиса (например - updateProfileData.pending или updateProfileData.fulfilled);
describe('profileSlice', () => {
    // ? Тесты сервисов в слайсах;
    // ? Состояние pending в данном случае является своего рода action;
    // ? В toEqual() как бы логично, что в момент pending'a isLoading становится true, а валидационные ошибки очищаются;
    test('Slice should be created, updateProfileData should be pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [
                VALIDATE_PROFILE_ERROR.SERVER_ERROR,
            ],
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending),
        ).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('Slice should be created, updateProfileData should be fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        expect(
            // ? Здесь можно в fulfiiled передавать аргументы, собственно, как и в любой другой action, если он принимает какие-либо аргументы;
            profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')),
        ).toEqual({
            isLoading: false,
            readonly: true,
            validateErrors: undefined,
            form: data,
            data,
        });
    });

    test('Slice should be created, data should be update and sent', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            readonly: false,
            data,
            form: formData,
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.updateProfile(formData)),
        ).toEqual({
            isLoading: false,
            readonly: false,
            data,
            form: formData,
        });
    });

    test('Slice should be created, readonly should be setted', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            readonly: false,
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.setReadonly(true)),
        ).toEqual({
            isLoading: false,
            readonly: true,
        });
    });

    test('Slice should be created, form should be canceled to the data', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            readonly: false,
            data,
            form: formData,
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            isLoading: false,
            readonly: true,
            data,
            form: data,
        });
    });
});
