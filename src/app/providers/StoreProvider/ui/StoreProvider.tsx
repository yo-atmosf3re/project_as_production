import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '..';

interface StoreProviderPropsI {
   children?: ReactNode;
   initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: React.FC<StoreProviderPropsI> = ({
    children, initialState,
}) => {
    const store = createReduxStore(initialState as StateSchema);
    return (
        <Provider
            store={store}
        >
            {children}
        </Provider>
    );
};
