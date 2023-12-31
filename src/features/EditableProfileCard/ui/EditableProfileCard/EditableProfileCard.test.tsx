import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { ProfileI } from 'entities/Profile';
import { CURRENCY } from 'entities/Currency';
import { COUNTRY } from 'entities/Country';
import userEvent from '@testing-library/user-event';
import { profileReducer } from '../../models/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const PROFILE: ProfileI = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 40,
    currency: CURRENCY.RUB,
    country: COUNTRY.RUSSIA,
    city: 'Moscow',
    username: 'admin123',
};

const OPTIONS = {
    initialState: {
        profile: {
            readonly: true,
            data: PROFILE,
            form: PROFILE,
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
        />, OPTIONS);

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));
        expect(screen.getByTestId('EditableProfilePageHeader.CancelButton')).toBeInTheDocument();
    });

    test('When be canceled, values should be nulled', async () => {
        componentRender(<EditableProfileCard
            id="1"
        />, OPTIONS);

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });
});
