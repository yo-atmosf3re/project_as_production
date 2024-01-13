import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from '@headlessui/react';
import { DropdownDirectionUnionType } from 'shared/types/ui';
import { MAP_DIRECTION_CLASS } from '../../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../../styles/Popup.module.scss';

interface PopoverPropsI {
    className?: string;
    direction?: DropdownDirectionUnionType;
    trigger: ReactNode;
}

/**
 * Компонента, входящая в комплект UI-kit проекта. Всплывающее окно, которое появляется поверх основного контента (для отображения дополнительной информации или опций в контексте определенного элемента);
 * @param className
 * @param trigger - содержимое кнопки, которая активирует показ содержимого `Popover`;
 * @param direction - направление отрисовки `Popover`;
 */
export const MyPopover: React.FC<PopoverPropsI> = ({
    className, trigger, direction,
}) => {
    // const menuClasses: Array<string | undefined> = [
    //     MAP_DIRECTION_CLASS[direction],
    // ];

    return (
        <Popover
            className="relative"
        >
            <Popover.Button
                className={popupCls.trigger}
            >
                {
                    trigger
                }
            </Popover.Button>

            <Popover.Panel className="absolute z-10">
                Pop
            </Popover.Panel>
        </Popover>
    );
};
