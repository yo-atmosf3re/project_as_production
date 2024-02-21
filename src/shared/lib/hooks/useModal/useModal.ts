import {
    useState, useCallback,
    useEffect, useRef,
    MutableRefObject,
} from 'react';

export interface UseModalPropsI {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

export function useModal({
    animationDelay, isOpen, onClose,
}: UseModalPropsI) {
    const [isClosing, setIsClosing] = useState(false);
    // ? Помещаем в состояние вмонтирован компонент или нет;
    const [isMounted, setIsMounted] = useState(false);

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
    }, [close]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearInterval(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    // ? Управляет состоянием вмонтирования компоненты, и если модальное окно открыто, то состояние вмонтирования - true;
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    return {
        isClosing,
        isMounted,
        close,
    };
}
