import React, { memo, useCallback } from 'react';
import { Button, BUTTON_THEME } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherPropsI {
    className?: string;
}
/**
 * Компонента, которая переключает цветовые темы во всём приложении;
 * @param className
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherPropsI> = memo(
    ({ className }) => {
        const { theme, toggleTheme } = useTheme();
        const dispatch = useAppDispatch();

        const onToggleHandler = useCallback(() => {
            toggleTheme((newTheme) => {
                dispatch(
                    saveJsonSettings({
                        theme: newTheme,
                    }),
                );
            });
        }, [dispatch, toggleTheme]);

        const deprecatedThemeSwitcher = (
            <Button
                theme={BUTTON_THEME.CLEAR}
                className={classNames(cls.themeSwitcher, {}, [className])}
                onClick={onToggleHandler}
            >
                <IconDeprecated
                    Svg={ThemeIconDeprecated}
                    width={40}
                    height={40}
                    inverted
                />
            </Button>
        );

        return (
            <ToggleFeatures
                on={
                    <Icon
                        Svg={ThemeIcon}
                        clickable
                        onClick={onToggleHandler}
                    />
                }
                off={deprecatedThemeSwitcher}
                feature="isAppRedesigned"
            />
        );
    },
);
