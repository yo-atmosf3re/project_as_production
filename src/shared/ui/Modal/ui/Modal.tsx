/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalPropsI {
   className?: string;
   children?: React.ReactNode;
   isOpen?: boolean;
   onClose? : () => void;
}

const ANIMATION_DELAY = 300;

// ? Модальное окно, обёрнутое в реактовский Portal. Внутри логика по плавному открытию-закрытию этого модального окна;
export const Modal: React.FC<ModalPropsI> = ({
    className, children, isOpen, onClose,
}) => {
    const [isClosing, setIsClosing] = React.useState(false);
    const { theme } = useTheme();

    const additionalClasses = [
        className,
        theme,
    ];

    const mods: ModsType = {
        [cls.opened]: isOpen,
        [cls['is-closing']]: isClosing,
    };

    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

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
