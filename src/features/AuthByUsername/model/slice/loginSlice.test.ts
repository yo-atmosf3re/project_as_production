import { LoginSchema } from '../types/LoginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('Slice should be created, username should be added', () => {
        const state: LoginSchema = {
            username: 'Alex',
            password: '123',
            isLoading: false,
        };
        expect(
            loginReducer(state, loginActions.setUsername('Dave')),
        ).toEqual({
            username: 'Dave',
            password: '123',
            isLoading: false,
        });
    });
});

describe('loginSlice', () => {
    test('Slice should be created, password should be added', () => {
        const state: LoginSchema = {
            username: 'Alex',
            password: '123',
            isLoading: false,
        };
        expect(
            loginReducer(state, loginActions.setPassword('321')),
        ).toEqual({
            username: 'Alex',
            password: '321',
            isLoading: false,
        });
    });
});
