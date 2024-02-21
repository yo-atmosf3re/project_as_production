import React, { memo } from 'react';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { ArticleTextBlockI } from '../../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentPropsI {
    className?: string;
    block: ArticleTextBlockI;
}

export const ArticleTextBlockComponent: React.FC<ArticleTextBlockComponentPropsI> = memo(({
    className, block,
}) => {
    const mods: ModsType = {};
    return (
        <div
            className={classNames(cls['articleBlock-text'], mods, [className])}
        >
            {
                block.title
                    ? (
                        <Text
                            title={block.title}
                            className={cls.title}
                        />
                    )
                    : null
            }
            {
                block.paragraphs.map((paragraph) => (
                    <Text
                        key={paragraph}
                        text={paragraph}
                        className={cls.paragraph}
                    />
                ))
            }
        </div>
    );
});
