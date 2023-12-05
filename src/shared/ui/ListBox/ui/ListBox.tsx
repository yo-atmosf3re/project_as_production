import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../Button';
import { ModsType, classNames } from '../../../lib/classNames/classNames';
import cls from './ListBox.module.scss';

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
}

/**
 *
 * @param className
 * @param items - ;
 * @param value - выбранный элемент, соответствующий какому-то пункту из списка;
 * @param defaultValue - дефолтный элемент, если какой-либо элемент не выбран;
 * @param onChange - переключатель элементов в списке;
 */
export const ListBox: React.FC<ListBoxPropsI> = ({
    className, items,
    onChange, defaultValue,
    value,
}) => {
    const mods: ModsType = {};
    return (
        <HListBox
            as="div"
            className={classNames(cls['list-box'], mods, [className])}
            value={value}
            onChange={onChange}
        >
            <HListBox.Button
                className={cls.trigger}
            >
                <Button>
                    {
                        // ? При отсутствии value отрисовывается defaultValue;
                        value ?? defaultValue
                    }
                </Button>
            </HListBox.Button>
            <HListBox.Options
                className={cls.options}
            >
                {
                    items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
                                    })}
                                >
                                    {
                                        selected && '!!!'
                                    }
                                    {
                                        item.content
                                    }
                                </li>
                            )}
                        </HListBox.Option>
                    ))
                }
            </HListBox.Options>
        </HListBox>
    );
};
