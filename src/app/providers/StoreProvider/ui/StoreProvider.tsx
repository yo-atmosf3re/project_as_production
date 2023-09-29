import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Provider } from 'react-redux';
import cls from './StoreProvider.module.scss';
import { createReduxStore } from '../config/store';
import { StateSchema } from '..';

interface StoreProviderPropsI {
   children?: ReactNode;
   initialState?: StateSchema;
}

export const StoreProvider: React.FC<StoreProviderPropsI> = ({
    children, initialState,
}) => {
    const store = createReduxStore(initialState);
    return (
        <Provider
            store={store}
        >
            {children}
        </Provider>
    );
};
