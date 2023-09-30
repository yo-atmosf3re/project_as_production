/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

// ? Подключение модуля fs - для работы с файловой системы;
const fs = require('fs');
// ? Подключение модуля json-server для создания JSON API;
const jsonServer = require('json-server');
// ? Подключение модуля path для работы с путями к файлам и папкам;
const path = require('path');

// ? Создание сервера;
const server = jsonServer.create();

// ? Подключение роутера для обработки запросов;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// ? Использование настроек по умолчанию для сервера;
server.use(jsonServer.defaults({}));
// ? Использование модуля для разбора тела запроса;
server.use(jsonServer.bodyParser);

// ? Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального API;
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// ? Эндпоинт для логина;
server.post('/login', (req, res) => {
    try {
        // ? Извлечение username, password;
        const { username, password } = req.body;
        // ? Загрузка содержимого db.json в переменную;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        // ? Проверка на правильность ввода пароля и логина;
        // ? Поиск в массиве users, у которого поля username, password соответствуют введенным значениям;
        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        // ? Если найденный пользователь есть, то возвращаются его данные в формате JSON;
        if (userFromBd) {
            return res.json(userFromBd);
        }

        // ? Если пользователь не найден, то возвращается соответствующая ошибка, описанная ниже;
        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        // ? При наличии какой-либо ошибки в выполнении кода - выкидывает пятисотую ошибку и сообщение об ошибке;
        return res.status(500).json({ message: e.message });
    }
});

// ? Проверяем, авторизован ли пользователь;
// eslint-disable-next-line
server.use((req, res, next) => {
    // ? Проверка заголовков, которые мы присылаем в HTTP-запросе, и если есть заголовок authorization, в котором находится наш токен, то запрос валидный - значит, что пользователь авторизован, а в обратном случае возвращаем 403 статус-код (пользователь не авторизован);
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    // ? При несоблюдении условий выше - вызывается функция next(), которая передаёт управление следующей middleware;
    next();
});

// ? Использование роутера для обработки остальных запросов;
server.use(router);

// ? Запуск сервера;
server.listen(7777, () => {
    console.log('server is running on 7777 port');
});
