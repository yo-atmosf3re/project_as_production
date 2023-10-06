import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Text } from './Text';

describe('Text test', () => {
    test('Render text', () => {
        componentRender(
            <Text
                text="Some text"
            />,
        );
        expect(screen.getByTestId('text')).toHaveTextContent('Some text');
    });

    test('Render title', () => {
        componentRender(
            <Text
                title="Some title"
            />,
        );
        expect(screen.getByTestId('title')).toHaveTextContent('Some title');
    });

    test('Render with both variants', () => {
        componentRender(
            <Text
                title="Some title"
                text="Some text"
            />,
        );

        const title = screen.getByTestId('title');
        const text = screen.getByTestId('text');

        expect(title).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
