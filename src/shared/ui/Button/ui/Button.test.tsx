/* eslint-disable i18next/no-literal-string */
import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button';

describe('Button test', () => {
    test('Testing button', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
