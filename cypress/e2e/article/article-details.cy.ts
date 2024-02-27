let currentArticleId = '';

describe('The user go to article page', () => {
    beforeEach(() => {
        // ? Логин;
        cy.login();
        cy
            // ? Создание статьи;
            .createArticle()
            .then((article) => {
                // ? Присваивание айди тестовой статьи в переменную;
                currentArticleId = article.id;
                cy.log(JSON.stringify(article));
                cy
                    // ? Переход на страницу с конкретной статьёй;
                    .visit(`articles/${article.id}`);
            });
    });

    afterEach(() => {
        cy
            // ? Удаление статьи после каждого теста;
            .removeArticle(currentArticleId);
    });

    it('The user sees content of the article page', () => {
        cy
            // ? Получение конкретной статьи, на которую был совершён переход;
            .getByTestId('ArticleDetails.Info')
            // ? Проверка на существование;
            .should('exist');
    });
});
