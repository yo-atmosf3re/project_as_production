describe('The user go to article list page', () => {
    beforeEach(() => {
        cy
            // ? Логинимся;
            .login()
            // ? Переходим на страницу со списком статей;
            .then(
                (data) => {
                    cy.visit('articles');
                },
            );
    });
    it('The article list page is successfuly loaded', () => {
        cy
            // ? Поиск списка статей;
            .getByTestId('ArticleList')
            // ? Проверка на существование;
            .should('exist');
        cy
            // ? Поиск статьи из списка статей;
            .getByTestId('ArticleListItem')
            // ? Проверка на количества таких статей - при успешной загрузке должно быть 3 или > 3;
            .should('have.length.greaterThan', 3);
    });
});
