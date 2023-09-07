/* eslint-disable i18next/no-literal-string */
import { Button } from 'shared/ui/Button';
import { render, screen } from '@testing-library/react';

describe('Button test', () => {
    test('Testing button', () => {
        render(
            <Button>
                Test
            </Button>,
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
