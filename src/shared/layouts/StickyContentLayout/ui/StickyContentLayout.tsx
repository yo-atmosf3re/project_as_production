import React, { ReactElement, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';

interface StickyContentLayoutPropsI {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

/**
 *
 * @param className
 */
export const StickyContentLayout: React.FC<StickyContentLayoutPropsI> = memo(({
    className, content, left, right
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls.sticky, {}, [className])}
        >
            {right && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {left && <div className={cls.right}>{right}</div>}
        </div>
    );
});
