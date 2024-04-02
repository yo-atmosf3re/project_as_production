import React from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconPropsI extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * Обёртка для svg-иконок, которая позволяет более удобно управлять цветом, по-умолчанию fill имеет значение primary-color. Входит в комплект UI-kit проекта;
 * @param classname
 * @param SVG - svg, которое нужно обернуть;
 * @deprecated используется новые компоненты из папки `redesigned`;
 */
export const Icon: React.FC<IconPropsI> = ({
    className,
    Svg,
    inverted,
    ...otherProps
}) => {
    const mainClass = '';
    const mods: ModsType = {
        [cls.inverted]: inverted,
    };

    return (
        <Svg
            className={classNames(mainClass, mods, [className])}
            {...otherProps}
        />
    );
};
