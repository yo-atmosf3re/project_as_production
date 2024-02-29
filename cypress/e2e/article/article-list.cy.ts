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

    // ! Не работает;
    it.skip('The article list page is successfuly loaded (stub\'s example)', () => {
        // " Стабы - заглушки, возвращающие заранее определенные значения на определенные входные данные. От части, является синонимом для моков;
        cy
            .intercept(
                // ? Указание запроса;
                'GET',
                // ? Указание регулярного выражения;
                '**/articles?*',
                {
                    // ? В качестве фикстуры указывается подготовленный файл со всеми статьями;
                    fixture: 'articles.json',
                },
            )
            .then((res) => cy
                .log(JSON.stringify(res)));
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

    it.skip('The example, when failed test skipped', () => {
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
