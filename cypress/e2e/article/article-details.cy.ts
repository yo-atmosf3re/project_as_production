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

    it.skip('The user sees content of the article page', () => {
        cy
            // ? Получение конкретной статьи, на которую был совершён переход;
            .getByTestId('ArticleDetails.Info')
            // ? Проверка на существование;
            .should('exist');
    });

    it.skip("The user sees article recommendation's list", () => {
        cy
            // ? Получение списка с рекомендациями;
            .getByTestId('ArticleRecommendationsList')
            // ? Проверка на существование;
            .should('exist');
    });

    it.skip('The user add to comment at article', () => {
        cy
            // ? Получение конкретной статьи, на которую был совершён переход;
            .getByTestId('ArticleDetails.Info');
        cy
            // ? Получение формы для заполнения и отправки комментария;
            .getByTestId('AddCommentForm')
            // ? Скролл к этой форме;
            .scrollIntoView();
        cy
            // ? Отправка комментариями;
            .addComment('text');
        cy
            // ? Получение комментария;
            .getByTestId('CommentCard.Content')
            // ? Проверка на количество комментариев (исключение дублирования и каких-либо ошибок);
            .should('have.length', 1);
    });

    it.only("The user add to rate for article (stub's example)", () => {
        cy
            // ? Инициализация интерцептора на гет-запрос, который отлавливает по куску URL, содержащий "/articles/", а в качестве фикстуры указывается article-details.json;
            .intercept(
                // ? Указание запроса;
                'GET',
                // ? Кусок URL (указание регулярного выражения или строки);
                '**/articles/*',
                // ? Указание фикстуры (ответом бекенда, проще говоря, будет этот json-файл);
                {
                    // " Фикстура - подготовка окружения с заранее фиксированным/известным состоянием для гарантированной повторяемости тестирования;
                    fixture: 'article-details.json',
                },
            );

        cy
            // ? Получение конкретной статьи, на которую был совершён переход;
            .getByTestId('ArticleDetails.Info');
        cy
            // ? Получение карточки с рейтингом;
            .getByTestId('RatingCard')
            // ? Скролл к этой карточке;
            .scrollIntoView();
        cy
            // ? Установка рейтинга и фидбека;
            .setRate(4, 'feedback');
        cy
            // ? Проверка на количественно выбранных звёзд;
            .get('[data-selected=true]')
            // ? После установки рейтинга их должно быть определенное количество;
            .should('have.length', 4);
    });
});
