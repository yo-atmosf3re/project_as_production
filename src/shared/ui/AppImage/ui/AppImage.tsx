import React, {
    ImgHTMLAttributes, ReactElement,
    memo, useLayoutEffect,
    useState,
} from 'react';

interface AppImagePropsI extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

/**
 * Компонента, входящая в комплект UI-kit проекта, которая оптимизирует отрисовку изображений, делая интерфейс целостным: добавляет возможность управлять состоянием отображаемой загрузки изображения, а так же позволяет визуализировать ошибку в том случае, если изображение не удалось загрузить;
 * @param className
 * @param fallback - React-нода, которая отрисовывается во время загрузки изображения;
 * @param errorFallback - React-нода, которая отрисовывается в том случае, если возникла какая-либо ошибка вовремя загрузки изображения;
 */
export const AppImage: React.FC<AppImagePropsI> = memo(({
    className,
    src,
    alt = 'image',
    errorFallback = (
        <div>
            Something wrong...
        </div>
    ), fallback,
    ...otherProps
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        // ? Создание изображения;
        const image = new Image();

        // ? Передача пути в новое изображение;
        image.src = src ?? '';

        // ? Обработка состояния сразу после загрузки изображения;
        image.onload = () => {
            setIsLoading(false);
        };

        // ? Обработка состояний сразу после возникновения какой-либо ошибки;
        image.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    // ? Отрисовывается fallback в случае, если идёт загрузка и сам fallback передан;
    if (isLoading && fallback) {
        return fallback;
    }

    // ? Отрисовывается errorFallback в случае, если возникла ошибка и сам errorFallback передан;
    if (hasError && errorFallback) {
        return errorFallback;
    }

    return (
        <img
            className={className}
            src={src}
            alt={alt}
            {...otherProps}
        />
    );
});
