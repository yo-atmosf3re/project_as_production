import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../../Stack';
import YoSvg from '../../../../assets/icons/yo_logo.svg';
import { Icon } from '../../Icon';

interface AppLogoPropsI {
    className?: string;
}

/**
 * Компонента, которая отрисовывает проектное лого в виде `svg`, входящая в комплект UI-kit проекта;
 * @param className
 * @deprecated используется новые компоненты из папки `redesigned`;
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
                width={230}
                height={70}
            />
        </HStack>
    );
});
