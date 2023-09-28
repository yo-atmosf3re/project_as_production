import { Button } from 'shared/ui/Button';
import { render, screen } from '@testing-library/react';
import { BUTTON_THEME } from './Button';

describe('Button test', () => {
    test('Testing button', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('Testing button with clear theme', () => {
        render(<Button theme={BUTTON_THEME.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
    });
});
