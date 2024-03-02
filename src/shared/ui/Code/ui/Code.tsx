import React, { ReactNode, useCallback } from 'react';
import { ModsType, classNames } from '../../../lib/classNames/classNames';
import { Button, BUTTON_THEME } from '../../../ui/Button';
import cls from './Code.module.scss';
import CopyIcon from '../../../assets/icons/copy_icon.svg';

interface CodePropsI {
    className?: string;
    text: string;
}

/**
 * Кастомная компонента, входящая в комплект UI-kit проекта, которая отрисовывает программный код. Children обёрнут в <pre>, а затем в <code>. Тег <pre> позволяет сохранять все нужные отступы, переносы и пробелы;
 * @param className
 * @param text - сам код, который нужно отрисовать;
 */
export const Code: React.FC<CodePropsI> = ({ className, text }) => {
    const mods: ModsType = {};

    const onCopyHandler = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.code, mods, [className])}>
            <Button
                onClick={onCopyHandler}
                theme={BUTTON_THEME.CLEAR}
                className={cls['copy-button']}
            >
                <CopyIcon
                    className={cls['copy-icon']}
                    style={{ stroke: 'red' }}
                />
            </Button>
            <code>{text}</code>
        </pre>
    );
};
