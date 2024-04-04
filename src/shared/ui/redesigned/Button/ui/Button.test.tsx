import { render, screen } from '@testing-library/react';
import { Button, ButtonVariantType } from './Button';

describe('Button test', () => {
    test('Testing button', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('Testing button with clear theme', () => {
        render(<Button variant={BUTTON_THEME.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
    });
});
