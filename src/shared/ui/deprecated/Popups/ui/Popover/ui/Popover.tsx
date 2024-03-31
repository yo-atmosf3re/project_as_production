import React, { ReactNode } from 'react';
import { Popover } from '@headlessui/react';
import {
    ModsType,
    classNames,
} from '../../../../../../lib/classNames/classNames';
import { DropdownDirectionUnionType } from '../../../../../../types/ui';
import { MAP_DIRECTION_CLASS } from '../../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../../styles/popup.module.scss';

interface PopoverPropsI {
    className?: string;
    direction?: DropdownDirectionUnionType;
    trigger: ReactNode;
    children: ReactNode;
}

/**
 * Компонента, входящая в комплект UI-kit проекта. Всплывающее окно, которое появляется поверх основного контента (для отображения дополнительной информации или опций в контексте определенного элемента);
 * @param className
 * @param trigger - содержимое кнопки, которая активирует показ содержимого `Popover`;
 * @param direction - направление отрисовки `Popover`;
 * @param children
 */
export const MyPopover: React.FC<PopoverPropsI> = ({
    className,
    trigger,
    direction = 'bottom right',
    children,
}) => {
    const menuMods: ModsType = {};

    const additionalClasses: Array<string | undefined> = [
        className,
        popupCls.popup,
    ];

    const menuClasses: Array<string | undefined> = [
        MAP_DIRECTION_CLASS[direction],
    ];

    return (
        <Popover
            className={classNames(cls.popover, menuMods, additionalClasses)}
        >
            <Popover.Button
                as="div"
                className={popupCls.trigger}
            >
                {trigger}
            </Popover.Button>

            <Popover.Panel className={classNames(cls.panel, {}, menuClasses)}>
                {children}
            </Popover.Panel>
        </Popover>
    );
};
