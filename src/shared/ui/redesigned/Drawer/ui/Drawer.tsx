import React, { ReactNode, memo, useCallback, useEffect } from 'react';
import { useTheme } from '../../../../lib/hooks/useTheme/useTheme';
import { Overlay } from '../../../redesigned/Overlay';
import { Portal } from '../../../redesigned/Portal';
import { classNames, ModsType } from '../../../../lib/classNames/classNames';
import cls from './Drawer.module.scss';
import {
    AnimationProvider,
    useAnimationLibs,
} from '../../../../lib/components/AnimationProvider';
import { toggleFeatures } from '@/shared/lib/features';

interface DrawerPropsI {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const HEIGHT = window.innerHeight - 100;

// ? Основное описание компоненты представлено ниже;
/**
 * @deprecated используется новые компоненты из папки `redesigned`;
 */
export const DrawerContent: React.FC<DrawerPropsI> = memo(
    ({ className, children, isOpen, onClose }) => {
        const { Spring, Gesture } = useAnimationLibs();

        const { theme } = useTheme();

        const [{ y }, api] = Spring.useSpring(() => ({ y: HEIGHT }));

        const openDrawer = useCallback(() => {
            api.start({
                y: 0,
                immediate: false,
            });
        }, [api]);

        useEffect(() => {
            if (isOpen) {
                openDrawer();
            }
        }, [api, isOpen, openDrawer]);

        const close = (velocity = 0) => {
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
            ({
                last,
                velocity: [, vy],
                direction: [, dy],
                movement: [, my],
                cancel,
            }) => {
                if (my < -70) cancel();

                if (last) {
                    if (my > HEIGHT * 0.5 || (vy > 0.5 && dy > 0)) {
                        close();
                    } else {
                        openDrawer();
                    }
                } else {
                    api.start({
                        y: my,
                        immediate: true,
                    });
                }
            },
            {
                from: () => [0, y.get()],
                filterTaps: true,
                bounds: { top: 0 },
                rubberband: true,
            },
        );

        if (!isOpen) {
            return null;
        }

        const display = y.to((py) => (py < HEIGHT ? 'block' : 'none'));

        const mods: ModsType = {};

        const additionalClasses: Array<string | undefined> = [
            className,
            theme,
            'app_drawer',
            toggleFeatures({
                name: 'isAppRedesigned',
                on: () => cls['drawer-new'],
                off: () => cls['drawer-old'],
            }),
        ];

        return (
            <Portal element={document.getElementById('app') ?? document.body}>
                <div
                    className={classNames(cls.drawer, mods, additionalClasses)}
                >
                    <Overlay onClick={close} />
                    <Spring.a.div
                        className={cls.sheet}
                        style={{
                            display,
                            bottom: `calc(-100vh + ${HEIGHT - 100}px)`,
                            y,
                        }}
                        {...bind()}
                    >
                        {children}
                    </Spring.a.div>
                </div>
            </Portal>
        );
    },
);

/**
 * Обёртка, которая подгружает библиотеки, которые предоставляет кастомный хук `useAnimationLibs`;
 */
const DrawerAsync: React.FC<DrawerPropsI> = (props) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

/**
 * Модальное окно, которое выезжает из нижней части экрана (для мобильных разрешений экрана). Для более детальное информации рекомендуется перейти в файл с этой компонентой;
 * @param className
 * @param isOpen - флаг отображения модального окна;
 * @param onClose - передаваемый коллбэк, на основании которого происходит плавное закрытие модального окна;
 * @deprecated используется новые компоненты из папки `redesigned`;
 */
export const Drawer: React.FC<DrawerPropsI> = (props) => {
    return (
        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    );
};
