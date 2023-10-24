import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
import { Counter } from './Counter';

describe('Counter test', () => {
    test('Testing counter', () => {
        componentRender(
            <Counter />,
            {
                initialState: {
                    counter: {
                        value: 10,
                    },
                },
            },
        );
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('Increment value', () => {
        componentRender(
            <Counter />,
            {
                initialState: {
                    counter: {
                        value: 10,
                    },
                },
            },
        );
        userEvent.click(screen.getByTestId('increment-button'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('Decrement value', () => {
        componentRender(
            <Counter />,
            {
                initialState: {
                    counter: {
                        value: 10,
                    },
                },
            },
        );
        userEvent.click(screen.getByTestId('decrement-button'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
