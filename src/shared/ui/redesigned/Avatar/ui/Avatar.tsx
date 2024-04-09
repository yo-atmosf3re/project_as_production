import React, { CSSProperties, useMemo } from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../../redesigned/AppImage';
import UserIcon from '../../../../assets/icons/user.svg';
import { Icon } from '../../Icon';
import { Skeleton } from '../../Skeleton';

interface AvatarPropsI {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

/**
 * Компонента для передачи аватара, входящая в комплект UI-kit проекта, которую можно настроить под себя различными пропсами;
 *
 * @param className
 * @param src - ссылка на img;
 * @param alt - альтернативный текст для изображения;
 * @param size - размер img;
 * @param fallbackInverted - флаг для указания инвертированного цвета иконки аватара;
 */
export const Avatar: React.FC<AvatarPropsI> = ({
    className,
    src,
    alt,
    size = 100,
}) => {
    const mods: ModsType = {};
    const additionalClasses: Array<string | undefined> = [className];

    // ? Задаём некоторые стили для img инлайново, а чтобы не было лишних перерисовок и объект сохранялся оборачиваем его в useMemo();
    // ? Ширина и высота одинаковые, потому что аватар будет круглым;
    const style: React.CSSProperties | undefined = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const fallback = (
        <Skeleton
            width={size}
            height={size}
            border="50%"
        />
    );

    const errorFallback = (
        <Icon
            Svg={UserIcon}
            height={size}
            width={size}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            className={classNames(cls.avatar, mods, additionalClasses)}
            src={src}
            alt={alt}
            style={style}
        />
    );
};
