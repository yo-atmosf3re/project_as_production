// import { classNames } from 'shared/lib/classNames/classNames';
import { classNames } from './classNames';

describe('classNames', () => {
    test('Testing a function only with one argument', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('Testing a function with additional class', () => {
        const expected = 'someClass classAgain1 classAgain2';
        expect(classNames('someClass', {}, ['classAgain1', 'classAgain2'])).toBe(expected);
    });

    test('Testing a function with additional class and mods', () => {
        const expected = 'someClass classAgain1 classAgain2 hovered scrollable';
        expect(
            classNames('someClass', { hovered: true, scrollable: true }, ['classAgain1', 'classAgain2']),
        ).toBe(expected);
    });

    test('Testing a function with additional class and mods, only one mode is false', () => {
        const expected = 'someClass classAgain1 classAgain2 hovered';
        expect(
            classNames('someClass', { hovered: true, scrollable: false }, ['classAgain1', 'classAgain2']),
        ).toBe(expected);
    });

    test('Testing a function with additional class and mods, only one mode is undefined', () => {
        const expected = 'someClass classAgain1 classAgain2 hovered';
        expect(
            classNames('someClass', { hovered: true, scrollable: undefined }, ['classAgain1', 'classAgain2']),
        ).toBe(expected);
    });
});
