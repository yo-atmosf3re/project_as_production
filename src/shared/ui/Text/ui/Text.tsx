import React from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TEXT_THEME {
    PRIMARY = 'primary',
    ERROR = 'error'
}

/**
 * Кнопка с возможностью кастомизации.
 *
 * @param className - дополнительный класс для кнопки.
 * @param title - более яркий и, чуть выше среднего размера, текст.
 * @param text - слегка бледный и обычного размера текст.
 * @param theme - тема текста.
 */
interface TextPropsI {
    className?: string;
    title?: string;
    text?: string;
    theme?: TEXT_THEME;
}

// ? Кастомный текстовый компонент, который отрисовывает либо яркий и более крупный title, либо более блеклый и мелкий text. Можно отрисовыывать то и то;
export const Text: React.FC<TextPropsI> = ({
    className, text, title,
    theme = TEXT_THEME.PRIMARY,
}) => {
    const mods: ModsType = {
        [cls[theme]]: true,
    };
    const additionalClasses: string[] = [
        className,
    ];
    return (
        <div
            data-testid="text-wrapper"
            className={classNames(cls['text-wrapper'], mods, additionalClasses)}
        >
            {
                title
                    ? (
                        <p
                            data-testid="title"
                            className={cls.title}
                        >
                            {title}
                        </p>
                    )
                    : null
            }
            {
                text
                    ? (
                        <p
                            data-testid="text"
                            className={cls.text}
                        >
                            {text}
                        </p>
                    )
                    : null
            }
        </div>
    );
};
