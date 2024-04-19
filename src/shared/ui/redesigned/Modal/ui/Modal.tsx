import React, { ReactNode } from 'react';
import { useModal } from '../../../../lib/hooks/useModal/useModal';
import { Overlay } from '../../../redesigned/Overlay';
import { Portal } from '../../../redesigned/Portal';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

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
 * Компонента-модальное окно, которая входит в UI-kit проекта, обёрнутое в реактовский Portal. Внутри логика по плавному открытию-закрытию этого модального окна (основная часть логики декомпозирована в кастомный хук `useModal`);
 * @param className
 * @param children
 * @param isOpen - флаг отображения модального окна;
 * @param onClose - передаваемый коллбэк, на основании которого происходит плавное закрытие модального окна;
 * @param lazy - флаг, который устанавливает ленивую загрузку для модального окна;
 *
 */
export const Modal: React.FC<ModalPropsI> = ({
    className,
    children,
    isOpen,
    onClose,
    lazy,
}) => {
    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen,
        onClose,
    });

    // ? При lazy = true и isMounted = false возвращает null. То есть, это ленивая загрузка компоненты, и модальное окно не будет вмонтировано в DOM-дерево сразу, а только тогда, когда модальное окно будет открыто. Это нужно для кейса с автофокусом в input при открытии модального окна;
    if (lazy && !isMounted) {
        return null;
    }

    const additionalClasses: Array<string | undefined> = [
        className,
        'app_modal',
        toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls['modal-new'],
            off: () => cls['modal-old'],
        }),
    ];

    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls['is-closing']]: isClosing,
    };

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.modal, mods, additionalClasses)}>
                <Overlay onClick={close} />
                <div
                    className={classNames(cls.content, {
                        [cls['content-opened']]: isOpen,
                    })}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
