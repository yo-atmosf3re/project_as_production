import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter: React.FC = () => {
    const counterValue = useCounterValue();
    const { t } = useTranslation();

    const { decrement, add, increment } = useCounterActions();

    const incrementHandler = () => {
        increment();
    };

    const decrementHandler = () => {
        decrement();
    };

    const addFiveHandler = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                data-testid="increment-button"
                onClick={incrementHandler}
            >
                {t('Increments')}
            </Button>
            <Button
                data-testid="decrement-button"
                onClick={decrementHandler}
            >
                {t('Decrement')}
            </Button>
            <Button
                data-testid="add-button"
                onClick={addFiveHandler}
            >
                {t('Add five')}
            </Button>
        </div>
    );
};
