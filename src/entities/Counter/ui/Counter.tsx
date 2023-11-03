import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter: React.FC = () => {
    const dispatch = useAppDispatch();
    const counterValue = useSelector(getCounterValue);
    const { t } = useTranslation();

    const increment = () => {
        dispatch(counterActions.increment());
    };
    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1
                data-testid="value-title"
            >
                {counterValue}
            </h1>
            <Button
                data-testid="increment-button"
                onClick={increment}
            >
                {
                    t('Incremens')
                }
            </Button>
            <Button
                data-testid="decrement-button"
                onClick={decrement}
            >
                {
                    t('Decrement')
                }
            </Button>
        </div>
    );
};