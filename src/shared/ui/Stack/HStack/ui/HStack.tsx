import React from 'react';
import { Flex, FlexPropsI } from '../../Flex';

// ? Исключение direction из типизации для переопределения этого свойства в дальнейшем;
type HStackPropsI = Omit<FlexPropsI, 'direction'>;

/**
 * Имплементация `Flex` в виде горизонтального стека (обёртка для `Flex`, внутри которой задан `direction` со значением `row`);
 * @returns `Flex`
 */
export const HStack = (props: HStackPropsI) => {
    return (
        <Flex
            direction="row"
            {...props}
        />
    );
};
