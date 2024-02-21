import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ProfileI } from '@/entities/Profile';
import { CURRENCY } from '@/shared/const/consts';
import { COUNTRY } from '@/entities/Country';
import userEvent from '@testing-library/user-event';
import { $API } from '@/shared/api/api';
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
    username: 'admin213',
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

    // ! Не рабочий тест-кейс;
    // test('When be canceled, values should be nulled', async () => {
    //     componentRender(<EditableProfileCard
    //         id="1"
    //     />, options);

    //     await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));

    //     await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    //     await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    //     expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    //     expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');

    //     await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    //     await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    //     expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    //     expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

    //     await userEvent.click(screen.getByTestId('EditableProfilePageHeader.CancelButton'));

    //     expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    //     expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    // });

    test('Error should be appear', async () => {
        componentRender(<EditableProfileCard
            id="1"
        />, options);

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.SaveButton'));

        expect(screen.getByTestId('EditableProfilePageHeader.Error.Paragraph')).toBeInTheDocument();
    });

    test('If hasn\'t validations error, that on the server should send PUT-request', async () => {
        // ? Мокаем PUT-запрос с помощью встроенного метода jest.spyOn(), где первым аргументом передаётся объект, который нужно замокать, а вторым аргументом - метод;
        const mockPutReq = jest.spyOn($API, 'put');

        componentRender(<EditableProfileCard
            id="1"
        />, options);

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.EditButton'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

        await userEvent.click(screen.getByTestId('EditableProfilePageHeader.SaveButton'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
