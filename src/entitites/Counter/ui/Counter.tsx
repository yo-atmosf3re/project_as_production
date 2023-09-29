/* eslint-disable i18next/no-literal-string */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter: React.FC = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue);

    const increment = () => {
        dispatch(counterActions.increment());
    };
    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1>
                value -
                {' '}
                {counterValue}
            </h1>
            <Button
                onClick={increment}
            >
                Increment
            </Button>
            <Button
                onClick={decrement}
            >
                Decrement
            </Button>
        </div>
    );
};
