import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Code } from 'shared/ui/Code';
import { ArticleCodeBlockI } from '../../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentPropsI {
    className?: string;
    block: ArticleCodeBlockI
}

export const ArticleCodeBlockComponent: React.FC<ArticleCodeBlockComponentPropsI> = memo(({
    className, block,
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls['articleBlock-code'], {}, [className])}
        >
            <Code text={block.code} />
        </div>
    );
});
