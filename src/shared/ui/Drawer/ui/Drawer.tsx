import React, { ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from '../../../lib/hooks/useModal/useModal';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal';
import { classNames, ModsType } from '../../../lib/classNames/classNames';
import cls from './Drawer.module.scss';

interface DrawerPropsI {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
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
    lazy,
}) => {
    const { close, isClosing, isMounted } = useModal(
        {
            animationDelay: 300,
            isOpen,
            onClose,
        },
    );

    const { theme } = useTheme();

    // ? При lazy = true и isMounted = false возвращает null. То есть, это ленивая загрузка компоненты, и модальное окно не будет вмонтировано в DOM-дерево сразу, а только тогда, когда модальное окно будет открыто. Это нужно для кейса с автофокусом в input при открытии модального окна;
    if (lazy && !isMounted) {
        return null;
    }
    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls['is-closing']]: isClosing,
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
                    onClick={close}
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
