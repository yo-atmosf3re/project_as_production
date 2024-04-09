import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { MAP_DIRECTION_CLASS } from '../../../styles/consts';
import { DropdownDirectionUnionType } from '../../../../../../types/ui';
import { HStack } from '../../../../../redesigned/Stack';
import { Button } from '../../../../Button';
import {
    ModsType,
    classNames,
} from '../../../../../../lib/classNames/classNames';
import cls from './ListBox.module.scss';
import popupCls from '../../../styles/popup.module.scss';

export interface ListBoxItemI {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxPropsI {
    className?: string;
    items?: ListBoxItemI[];
    value?: string;
    defaultValue?: string;
    // ? Дженерик `T` для поддержки enum'ов и прочего;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirectionUnionType;
    label?: string;
}

/**
 * Компонента, являющаяся кастомным тегом `select`, входящая в комплект UI-kit проекта. Предназначена для выбора пунктов из представленного меню опций, является частью контроля форм. Отличается от компоненты `Select` расширенным кастомизированным функционалом;
 * @param className
 * @param items - массив с элементами списка;
 * @param value - выбранный элемент, соответствующий какому-то пункту из списка;
 * @param defaultValue - дефолтный элемент, если какой-либо элемент не выбран;
 * @param onChange - переключатель элементов в списке;
 * @param readonly - флаг, отвечающий за дизейбл списка;
 * @param direction - направление отрисовки списка;
 * @param label
 */
export const ListBox: React.FC<ListBoxPropsI> = ({
    className,
    items,
    onChange,
    defaultValue,
    value,
    readonly,
    direction = 'bottom left',
    label,
}) => {
    const mainBoxMods: ModsType = {};

    const optionsClasses: Array<string | undefined> = [
        MAP_DIRECTION_CLASS[direction],
    ];

    return (
        <HStack gap="8">
            {label ? <span>{`${label}>`}</span> : null}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls['list-box'], mainBoxMods, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    disabled={readonly}
                    className={cls.trigger}
                >
                    <Button disabled={readonly}>
                        {
                            // ? При отсутствии value отрисовывается defaultValue;
                            value ?? defaultValue
                        }
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
};
