import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
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
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls['articleBlock-image'], {}, [className])}
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
