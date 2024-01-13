import React, { Fragment, ReactNode } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { Menu } from '@headlessui/react';
import { MAP_DIRECTION_CLASS } from '../../../styles/consts';
import { AppLink } from '../../../../AppLink';
import cls from './Dropdown.module.scss';
import popupCls from '../../../styles/Popup.module.scss';
import { DropdownDirectionUnionType } from '../../../../../types/ui';

export interface DropdownItemI {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownPropsI {
    className?: string;
    items: DropdownItemI[];
    trigger: ReactNode;
    direction?: DropdownDirectionUnionType;
}

/**
 *  Компонента, входящая в комплект UI-kit проекта. Похожая на `ListBox`: так же предоставляет доступ к представленным пунктам меню по нажатию кнопки, разница лишь в том, что при нажатии на эти пункты меню выполняется какое-либо действие (не имеет привязки к какой-либо форме как `select`, `checkbox`, `input` и так далее);
 * @param className
 * @param items - массив с элементами списка;
 * @param trigger - содержимое кнопки, которая активирует показ содержимого `Dropdown`;
 * @param direction - направление отрисовки списка;
 */
export const Dropdown: React.FC<DropdownPropsI> = ({
    className, items, trigger,
    direction = 'bottom right',
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
        <Menu
            as="div"
            className={classNames(cls.dropdown, menuMods, additionalClasses)}
        >
            <Menu.Button
                className={popupCls.trigger}
            >
                {
                    trigger
                }
            </Menu.Button>
            <Menu.Items
                className={classNames(cls.menu, {}, menuClasses)}
            >
                {
                    items.map((item) => {
                        const content = ({ active }: {active: boolean}) => (
                            <button
                                type="button"
                                disabled={item.disabled}
                                onClick={item.onClick}
                                key={String(item.onClick)}
                                className={classNames(
                                    cls.item,
                                    { [popupCls.active]: active },
                                )}
                            >
                                {
                                    item.content
                                }
                            </button>
                        );

                        if (item.href) {
                            return (
                                <Menu.Item
                                    as={AppLink}
                                    to={item.href}
                                    key={item.href + item.content}
                                    disabled={item.disabled}
                                >
                                    {
                                        content
                                    }
                                </Menu.Item>
                            );
                        }

                        return (
                            <Menu.Item
                                as={Fragment}
                                key={item.href && item.content ? item.href + item.content : ''}
                                disabled={item.disabled}
                            >
                                {
                                    content
                                }
                            </Menu.Item>
                        );
                    })
                }
            </Menu.Items>
        </Menu>
    );
};
