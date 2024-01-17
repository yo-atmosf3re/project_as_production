import React, { ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal';
import { classNames, ModsType } from '../../../lib/classNames/classNames';
import cls from './Drawer.module.scss';

interface DrawerPropsI {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

/**
 * Модальное окно, которое выезжает из нижней части экрана (для мобильных разрешений экрана);
 * @param className
 * @param isOpen - флаг отображения модального окна;
 * @param onClose - передаваемый коллбэк, на основании которого происходит плавное закрытие модального окна;
 */
export const Drawer: React.FC<DrawerPropsI> = ({
    className, children,
    isOpen, onClose,
}) => {
    const { theme } = useTheme();

    const mods: ModsType = {
        [cls.opened]: isOpen,
    };

    const additionalClasses: Array<string | undefined> = [
        className,
        theme,
        'app_drawer',
    ];

    return (
        <Portal>
            <div
                className={classNames(cls.drawer, mods, additionalClasses)}
            >
                <Overlay
                    onClick={onClose}
                />
                <div
                    className={cls.content}
                >
                    {
                        children
                    }
                </div>
            </div>
        </Portal>
    );
};
