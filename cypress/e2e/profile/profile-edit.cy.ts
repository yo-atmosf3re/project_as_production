describe('The user go to profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy
            // ? Обращение в методу login;
            .login()
            // ? Используем результаты возвращаемого значения от запроса с сервера, внутри которого хранится информация о конкретном пользователе;
            .then(
                (data) => {
                    cy.visit(`profile/${data.id}`);
                },
            );
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
    });
});
