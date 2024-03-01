import { EditableProfileCard } from '../../src/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

// ? Айди тестового юзера;
const USER_ID = '1';

// ? Опции для провайдера;
const OPTIONS = {
    initialState: {
        user: {
            authData: {
                id: USER_ID,
            },
        },
    },
};

describe('EditableProfileCard.cy.tsx', () => {
    it('An example showing how to test a component in isolation', () => {
        cy
            // ? Интерцептор, использующий подготовленную фикстуру с данными о юзере для корректного отображения изолированного компонента с карточкой пользователя;
            .intercept(
                'GET',
                '**/profile/*',
                {
                    fixture: 'profile.json',
                },
            );

        cy
            // ? Вмонтирование изолированного компонента для наглядного тестирования в настоящем браузере;
            .mount(
                // ? Провайдер, который предоставляет все нужные данные и состояние тестовой компоненте;
                <TestProvider
                    options={OPTIONS}
                >
                    <EditableProfileCard
                        id={USER_ID}
                    />
                </TestProvider>,
            );
    });
});
