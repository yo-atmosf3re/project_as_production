let profileId = '';

describe('The user go to profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy
            // ? Обращение в методу login;
            .login()
            // ? Используем результаты возвращаемого значения от запроса с сервера, внутри которого хранится информация о конкретном пользователе;
            .then(
                (data) => {
                    // ? Присвоение айди профиля в переменную, которая передаётся в последствии в функцию сброса после каждого тест кейса;
                    profileId = data.id;
                    cy.visit(`profile/${data.id}`);
                },
            );
    });

    // ? Сброс данных после каждого тест кейса;
    afterEach(() => {
        cy
            .resetProfile(profileId);
    });

    it('The profile page is success loaded', () => {
        cy
            // ? Получение инпута;
            .getByTestId(
                'ProfileCard.firstname',
            )
            // ? Проверка на имеющееся значение;
            .should(
                'have.value',
                'Test',
            );
    });

    it('The user edit to this profile page', () => {
        const newFirstname = 'new';
        const newLastname = 'lastname';
        // ? Описание каких-то действий происходит в командах, а сами проверки происходят только в тест кейсах;
        cy.updateProfile(
            newFirstname,
            newLastname,
        );
        cy
            // ? Наличие инпута;
            .getByTestId('ProfileCard.firstname')
            // ? Проверка на наличие значений, которые вводятся в команде updateProfile();
            .should('have.value', newFirstname);
        cy
            .getByTestId('ProfileCard.lastname')
            .should('have.value', newLastname);
    });
});
