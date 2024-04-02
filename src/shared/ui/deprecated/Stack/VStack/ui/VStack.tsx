import React from 'react';
import { Flex, FlexPropsI } from '../../Flex';

// ? Исключение direction из типизации для переопределения этого свойства в дальнейшем;
type VStackPropsI = Omit<FlexPropsI, 'direction'>;

/**
 * Имплементация `Flex` в виде горизонтального стека (обёртка для `Flex`, внутри которой задан `direction` со значением `column`);
 * @deprecated используется новые компоненты из папки `redesigned`;
 * @returns `Flex`
 */
export const VStack = (props: VStackPropsI) => {
    const { align = 'start' } = props;
    return (
        <Flex
            {...props}
            direction="column"
            align={align}
        />
    );
};
