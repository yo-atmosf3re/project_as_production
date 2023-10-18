import React, { CSSProperties, useMemo } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
/**
 * Компонента для передачи аватара, который можно настроить под себя различными пропсами;
 *
 * @param className - дополнительный класс для img;
 * @param src - ссылка на img;
 * @param alt - альтернативный текст для изображения;
 * @param size - размер img;
*/
interface AvatarPropsI {
    className?: string;
    src? : string;
    alt?:string;
    size?: number;
}

// ? Переиспользуемая компонента для вставки аватаров, входящая в комплект UI-kit проекта;
export const Avatar: React.FC<AvatarPropsI> = ({
    className, src, alt, size,
}) => {
    const mods: ModsType = {

    };
    const additionalClasses: Array<string | undefined> = [
        className,
    ];

    // ? Задаём некоторые стили для img инлайново, а чтобы не было лишних перерисовок и объект сохранялся оборачиваем его в useMemo();
    // ? Ширина и высота одинаковые, потому что аватар будет круглым;
    const style: React.CSSProperties | undefined = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img
            className={classNames(cls.avatar, mods, additionalClasses)}
            src={src}
            alt={alt}
            style={style}
        />
    );
};
