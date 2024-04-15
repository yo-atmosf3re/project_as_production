import React, { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../../Card';
import { Flex, FlexDirectionType } from '../../Stack/Flex/ui/Flex';

export interface TabItemI {
    value: string;
    content: ReactNode;
}

interface TabsPropsI {
    className?: string;
    tabs: TabItemI[];
    value: string;
    onTabClick: (tab: TabItemI) => void;
    direction?: FlexDirectionType;
}

/**
 * Компонента с кастомными таб-переключателями, входящая в комплект UI-kit проекта;
 * @param className
 * @param tabs - массив с табами;
 * @param value - значение, которое передаётся из родительской функции - т.н выбранный таб;
 * @param onTabClick - переключатель табов;
 */
export const Tabs: React.FC<TabsPropsI> = ({
    className,
    onTabClick,
    tabs,
    value,
    direction = 'row',
}) => {
    const onClickTabHandler = useCallback(
        (tab: TabItemI) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );
    return (
        <Flex
            direction={direction}
            gap="8"
            align="start"
            className={classNames(cls.tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(cls.tab, {[cls.selected]: isSelected})}
                        key={tab.value}
                        onClick={onClickTabHandler(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
};
