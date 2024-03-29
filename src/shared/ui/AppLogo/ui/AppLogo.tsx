import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../../Stack';
import YoSvg from '../../../assets/icons/yo_logo.svg';
import { Icon } from '../../Icon';

interface AppLogoPropsI {
    className?: string;
}

/**
 *
 * @param className
 */
export const AppLogo: React.FC<AppLogoPropsI> = memo(({ className }) => {
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
            />
        </HStack>
    );
});
