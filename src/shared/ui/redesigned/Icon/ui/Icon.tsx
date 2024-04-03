import React, { memo } from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBasePropsI extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBasePropsI {
    clickable?: false;
}

interface ClickableIconPropsI extends IconBasePropsI {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconPropsI;

/**
 * Обёртка для svg-иконок, которая позволяет более удобно управлять цветом, по-умолчанию fill имеет значение primary-color. Входит в обновленный комплект UI-kit проекта;
 * @param classname
 * @param SVG - svg, которое нужно обернуть;
 */
export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        height = 32,
        width = 32,
        clickable,
        ...otherProps
    } = props;

    const mainClass = cls.icon;
    const mods: ModsType = {};

    const icon = (
        <Svg
            className={classNames(mainClass, mods, [className])}
            height={height}
            width={width}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                className={cls.button}
                type="button"
                onClick={props.onClick}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
