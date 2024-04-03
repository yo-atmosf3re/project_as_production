import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import YoSvg from '../../../../assets/icons/yo_logo.svg';
import { Icon } from '../../Icon';
import { HStack } from '../../../deprecated/Stack';

interface AppLogoPropsI {
    className?: string;
    size?: number;
}

/**
 * Компонента, которая отрисовывает проектное лого в виде `svg`, входящая в обновлённый комплект UI-kit проекта;
 * @param className
 */
export const AppLogo: React.FC<AppLogoPropsI> = memo(
    ({ className, size = 230 }) => {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.wrapper, {}, [className])}
            >
                <div className={cls['gradient-big']} />
                <div className={cls['gradient-small']} />
                <Icon
                    Svg={YoSvg}
                    className={cls.logo}
                    width={size}
                    height={70}
                />
            </HStack>
        );
    },
);
