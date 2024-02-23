/**
 * Хелпер, принимающий аргумент в конкретного `datatest-id`. Возвращает строку в нужном для `cypress` виде с встроенным `datatest-id`;
 * @param testId
 */
export function selectByTestId(testId: string): string {
    return `[data-testid=${testId}]`;
}
