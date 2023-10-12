import { DeepPartial } from 'redux';
import { LoginSchema } from '../types/LoginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('Slice should be created, username should be changed', () => {
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

    test('Slice should be created, password should be changed', () => {
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

    test('Username should be set in state', () => {
        const state: DeepPartial<LoginSchema> = { username: 'Dave' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('Alex'),
            ),
        ).toEqual({ username: 'Alex' });
    });

    test('Password should be set in state', () => {
        const state: DeepPartial<LoginSchema> = { password: '321' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('321'),
            ),
        ).toEqual({ password: '321' });
    });
});
