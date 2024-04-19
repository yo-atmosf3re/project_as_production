import React, { memo } from 'react';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import {
    Text as TextDeprecated,
    TEXT_ALIGN,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleImageBlockI } from '../../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleImageBlockComponentPropsI {
    className?: string;
    block: ArticleImageBlockI;
}

export const ArticleImageBlockComponent: React.FC<ArticleImageBlockComponentPropsI> =
    memo(({ className, block }) => {
        const mods: ModsType = {};
        return (
            <div
                className={classNames(cls['articleBlock-image'], mods, [
                    className,
                ])}
            >
                <img
                    src={block.src}
                    alt={block.title}
                    className={cls.image}
                />
                {block.title ? (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                text={block.title}
                                align="center"
                            />
                        }
                        off={
                            <TextDeprecated
                                text={block.title}
                                align={TEXT_ALIGN.CENTER}
                            />
                        }
                    />
                ) : null}
            </div>
        );
    });
