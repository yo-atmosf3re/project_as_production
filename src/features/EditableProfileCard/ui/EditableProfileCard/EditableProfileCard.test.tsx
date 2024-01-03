import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { ProfileI } from 'entities/Profile';
import { CURRENCY } from 'entities/Currency';
import { COUNTRY } from 'entities/Country';
import userEvent from '@testing-library/user-event';
import { profileReducer } from '../../models/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: ProfileI = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 40,
    currency: CURRENCY.RUB,
    country: COUNTRY.RUSSIA,
    city: 'Moscow',
    username: 'admin123',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('Readonly value should be changed', async () => {
        componentRender(<EditableProfileCard
            id="1"
        />, options);

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));
        expect(screen.getByTestId('EditableProfilePageHeader.CancelButton')).toBeInTheDocument();
    });

    // ! Доделать тест, на данный момент он провальный, 72 - 16:41;
    test('When be canceled, values should be nulled', async () => {
        componentRender(<EditableProfileCard
            id="1"
        />, options);

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });
});
