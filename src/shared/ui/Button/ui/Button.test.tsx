import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from './Button';

describe('Button test', () => {
    test('Testing button', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('Testing button with clear theme', () => {
        render(<Button theme={THEME_BUTTON.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
    });
});
