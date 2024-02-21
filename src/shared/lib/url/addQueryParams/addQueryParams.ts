/**
 * Возвращает строку с параметрами запроса для текущего URL;
 * @param params - Необязательные параметры запроса;
 * @returns Строка с параметрами запроса;
 */
export function getQueryParams(params: OptionalRecord<string, string>): string {
    // ? Создаём экземпляр класса URLSearchParams, используя текущий URL;
    const searchParams = new URLSearchParams(window.location.search);

    // ? Перебираем все переданные параметры запроса, приводя их к строке, которая похожа на '?name=value&name=value' или '?name=value' (если в объекте меньше одного поля);
    Object.entries(params).forEach(([name, value]) => {
        // ? Если всё-таки value это undefined, то параметр не будет добавлен уже к существующим;
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });

    // ? Возвращаем строку с параметрами запроса;
    return `?${searchParams.toString()}`;
}

/**
 * Добавляет параметры строки к текущему URL;
 * @param params - параметры запроса;
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params));
}
