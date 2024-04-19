import React, { useCallback } from 'react';
import { ModsType, classNames } from '../../../../lib/classNames/classNames';
import cls from './Code.module.scss';
import CopyIcon from '../../../../assets/icons/copy_icon.svg';
import CopyIconNew from '../../../../assets/icons/copy.svg';
import { ToggleFeatures } from '../../../../lib/features';
import { Icon } from '../../Icon';
import { BUTTON_THEME, Button } from '../../../deprecated/Button';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <pre
                    className={classNames(cls['code-redesigned'], mods, [
                        className,
                    ])}
                >
                    <Icon
                        clickable
                        onClick={onCopyHandler}
                        className={cls['copy-button']}
                        Svg={CopyIconNew}
                    />
                    <code>{text}</code>
                </pre>
            }
            off={
                <pre className={classNames(cls.code, {}, [className])}>
                    <Button
                        onClick={onCopyHandler}
                        className={cls['copy-button']}
                        theme={BUTTON_THEME.CLEAR}
                    >
                        <CopyIcon className={cls['copy-icon']} />
                    </Button>
                    <code>{text}</code>
                </pre>
            }
        />
    );
};
