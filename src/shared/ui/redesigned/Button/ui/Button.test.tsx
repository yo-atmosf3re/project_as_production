import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button test', () => {
    test('Testing button', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('Testing button with clear variant', () => {
        render(<Button variant="clear">Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
    });
});
