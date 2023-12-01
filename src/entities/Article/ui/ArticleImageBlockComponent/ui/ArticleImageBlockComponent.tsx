import React, { memo } from 'react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import { TEXT_ALIGN, Text } from 'shared/ui/Text';
import { ArticleImageBlockI } from '../../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentPropsI {
    className?: string;
    block: ArticleImageBlockI;
}

export const ArticleImageBlockComponent: React.FC<ArticleImageBlockComponentPropsI> = memo(({
    className, block,
}) => {
    const mods: ModsType = {};
    return (
        <div
            className={classNames(cls['articleBlock-image'], mods, [className])}
        >
            <img
                src={block.src}
                alt={block.title}
                className={cls.image}
            />
            {
                block.title
                    ? (
                        <Text
                            text={block.title}
                            align={TEXT_ALIGN.CENTER}
                        />
                    )
                    : null
            }
        </div>
    );
});
