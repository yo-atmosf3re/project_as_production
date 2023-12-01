/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { MutableRefObject, ReactNode } from 'react';
import { Portal } from '../../Portal';
import { ModsType, classNames } from '../../../lib/classNames/classNames';
import cls from './Modal.module.scss';

interface ModalPropsI {
   className?: string;
   children?: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
   lazy?: boolean;
}

const ANIMATION_DELAY = 300;

// ? Modal пример той компоненты, которую не нужно мемоизировать, потому что у неё вложенная древовидная структура, которая подвержена каким-то постоянным изменениям;
/**
 * Компонента-модальное окно, которая входит в UI-kit проекта, обёрнутое в реактовский Portal. Внутри логика по плавному открытию-закрытию этого модального окна;
 * @param className
 * @param children
 * @param isOpen - флаг отображения модального окна;
 * @param onClose - передаваемый коллбэк, на основании которого происходит плавное закрытие модального окна;
 * @param lazy - флаг, который устанавливает ленивую загрузку для модального окна;
 */
export const Modal: React.FC<ModalPropsI> = ({
    className, children, isOpen, onClose, lazy,
}) => {
    const [isClosing, setIsClosing] = React.useState(false);
    // ? Помещаем в состояние вмонтирован компонент или нет;
    const [isMounted, setIsMounted] = React.useState(false);

    const additionalClasses: Array<string | undefined> = [
        className,
        'app_modal',
    ];

    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls['is-closing']]: isClosing,
    };

    const timerRef = React.useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const closeHandler = React.useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') closeHandler();
    }, [closeHandler]);

    React.useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    // ? Управляет состоянием вмонтирования компоненты, и если модальное окно открыто, то состояние вмонтирования - true;
    React.useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    // ? При lazy = true и isMounted = false возвращает null. То есть, это ленивая загрузка компоненты, и модальное окно не будет вмонтировано в DOM-дерево сразу, а только тогда, когда модальное окно будет открыто. Это нужно для кейса с автофокусом в input при открытии модального окна;
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, additionalClasses)}>
                <div
                    onClick={closeHandler}
                    className={cls.overlay}
                >
                    <div
                        className={classNames(cls.content, { [cls['content-opened']]: isOpen })}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
