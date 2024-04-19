/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// * Создает контекст и хук для обновления компонентов в React, а также компонент-провайдер для предоставления этого функционала дочерним компонентам;

// ? Создание контекста для обновления компонентов;
const ForceUpdateContext = createContext({
    value: true, // ? Значение контекста по умолчанию;
    forceUpdate: () => {}, // ? Функция обновления контекста по умолчанию;
});

// ? Хук для получения функции обновления контекста;
export const useForceUpdate = () => {
    const { forceUpdate } = useContext(ForceUpdateContext);

    return forceUpdate;
};

// ? Компонент-провайдер для обновления контекста;
export function ForceUpdateProvider({ children }: { children: ReactNode }) {
    // ? Состояние для значения контекста;
    const [value, setValue] = useState(true);

    // ? Функция для обновления контекста;
    const forceUpdate = () => {
        setValue((prev) => !prev); // ? Инверсия текущего значения состояния;
        setTimeout(() => {
            setValue((prev) => !prev); // ? Инверсия значения обратно после задержки;
        }, 120); // ? Задержка в 120 миллисекунд для визуальной анимации;
    };

    // ? Создание контекста значения и функции обновления с использованием useMemo для оптимизации;
    const valueContext = useMemo(() => {
        return { value, forceUpdate };
    }, [value]);

    // ? Если значение контекста равно false, возвращаем null (не отображаем компонент);
    if (!value) {
        return null;
    }

    // ? Возвращаем провайдер контекста с переданными дочерними элементами;
    return (
        <ForceUpdateContext.Provider value={valueContext}>
            {children}
        </ForceUpdateContext.Provider>
    );
}
