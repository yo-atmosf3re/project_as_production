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

    // it('И видит список рекоммендаций', () => {
    //     cy
    //         .getByTestId('ArticleRecommendationsList')
    //         .should('exist');
    // });

    // it('И оставляет комментарий', () => {
    //     cy
    //         .getByTestId('ArticleDetails.Info');
    //     cy
    //         .getByTestId('AddCommentForm')
    //         .scrollIntoView();
    //     cy
    //         .addComment('text');
    //     cy
    //         .getByTestId('CommentCard.Content')
    //         .should('have.length', 1);
    // });

    // it.only('И ставит оценку', () => {
    //     cy
    //         .getByTestId('ArticleDetails.Info');
    //     cy
    //         .getByTestId('RatingCard').scrollIntoView();
    //     cy
    //         .setRate(4, 'feedback');
    //     cy
    //         .get('[data-selected=true]')
    //         .should('have.length', 4);
    // });
});
