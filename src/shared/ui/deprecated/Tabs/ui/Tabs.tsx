import React, { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../redesigned/Stack';
import { CARD_THEME, Card } from '../../Card';
import cls from './Tabs.module.scss';

export interface TabItemI {
    value: string;
    content: ReactNode;
}

interface TabsPropsI {
    className?: string;
    tabs: TabItemI[];
    value: string;
    onTabClick: (tab: TabItemI) => void;
}

/**
 * Компонента с кастомными таб-переключателями, входящая в комплект UI-kit проекта;
 * @param className
 * @param tabs - массив с табами;
 * @param value - значение, которое передаётся из родительской функции - т.н выбранный таб;
 * @param onTabClick - переключатель табов;
 * @deprecated используется новые компоненты из папки `redesigned`;
 */
export const Tabs: React.FC<TabsPropsI> = ({
    className,
    onTabClick,
    tabs,
    value,
}) => {
    const onClickTabHandler = useCallback(
        (tab: TabItemI) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );
    return (
        <HStack
            gap="8"
            className={classNames(cls.tabs, {}, [className])}
        >
            {tabs.map((tab) => (
                <Card
                    theme={
                        tab.value === value
                            ? CARD_THEME.NORMAL
                            : CARD_THEME.OUTLINED
                    }
                    onClick={onClickTabHandler(tab)}
                    key={tab.value}
                    className={cls.tab}
                >
                    {tab.content}
                </Card>
            ))}
        </HStack>
    );
};
