import React, {
    ReactNode, memo,
    useCallback, useEffect,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useAnimationLibs } from 'shared/lib/components/AnimationProvider';
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

const HEIGHT = window.innerHeight - 100;

/**
 * Модальное окно, которое выезжает из нижней части экрана (для мобильных разрешений экрана);
 * @param className
 * @param isOpen - флаг отображения модального окна;
 * @param onClose - передаваемый коллбэк, на основании которого происходит плавное закрытие модального окна;
 */
export const DrawerContent: React.FC<DrawerPropsI> = memo(({
    className, children,
    isOpen, onClose,
}) => {
    // const { close, isClosing, isMounted } = useModal(
    //     {
    //         animationDelay: 300,
    //         isOpen,
    //         onClose,
    //     },
    // );

    const { Spring, Gesture } = useAnimationLibs();

    const { theme } = useTheme();

    const [{ y }, api] = Spring.useSpring(() => ({ y: HEIGHT }));

    const openDrawer = useCallback(() => {
        api.start(
            {
                y: 0,
                immediate: false,
            },
        );
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        console.log('close');
        api.start({
            y: HEIGHT,
            immediate: false,
            config: {
                ...Spring.config.stiff,
                velocity,
            },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        (
            {
                last,
                velocity: [, vy],
                direction: [, dy],
                movement: [, my],
                cancel,
            },
        ) => {
            if (my < -70) cancel();

            if (last) {
                if (my > HEIGHT * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start(
                    {
                        y: my,
                        immediate: true,
                    },
                );
            }
        },
        {
            from: () => [
                0,
                y.get(),
            ],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < HEIGHT ? 'block' : 'none'));

    // ? При lazy = true и isMounted = false возвращает null. То есть, это ленивая загрузка компоненты, и модальное окно не будет вмонтировано в DOM-дерево сразу, а только тогда, когда модальное окно будет открыто. Это нужно для кейса с автофокусом в input при открытии модального окна;
    // if (lazy && !isMounted) {
    //     return null;
    // }
    const mods: ModsType = {};

    const additionalClasses: Array<string | undefined> = [
        className,
        theme,
        'app_drawer',
    ];

    return (
        <Portal>
            <div
                className={classNames(
                    cls.drawer,
                    mods,
                    additionalClasses,
                )}
            >
                <Overlay
                    onClick={close}
                />
                <Spring.a.div
                    className={cls.sheet}
                    style={
                        {
                            display,
                            bottom: `calc(-100vh + ${HEIGHT - 100}px)`,
                            y,
                        }
                    }
                    {
                        ...bind()
                    }
                >
                    {
                        children
                    }
                </Spring.a.div>
            </div>
        </Portal>
    );
});

/**
 * Обёртка, которая подгружает библиотеки, которые предоставляет кастомный хук `useAnimationLibs`;
 */
export const Drawer: React.FC<DrawerPropsI> = memo((props) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return (
        <DrawerContent
            {...props}
        />
    );
});
