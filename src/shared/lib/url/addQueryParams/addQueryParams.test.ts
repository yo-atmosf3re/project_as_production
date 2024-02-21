import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
    test('Test with one param', () => {
        const params = getQueryParams(
            {
                test: 'value',
            },
        );
        expect(params).toBe('?test=value');
    });

    test('Test with multiple params', () => {
        const params = getQueryParams(
            {
                first: 'value',
                second: 'value',
            },
        );
        expect(params).toBe('?first=value&second=value');
    });

    test('Test with undefined', () => {
        const params = getQueryParams(
            {
                first: 'value',
                second: undefined,
            },
        );
        expect(params).toBe('?first=value');
    });
});
