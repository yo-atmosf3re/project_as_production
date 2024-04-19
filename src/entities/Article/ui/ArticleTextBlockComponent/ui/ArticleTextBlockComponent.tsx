import React, { memo } from 'react';
import { ModsType, classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleTextBlockI } from '../../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTextBlockComponentPropsI {
    className?: string;
    block: ArticleTextBlockI;
}

export const ArticleTextBlockComponent: React.FC<ArticleTextBlockComponentPropsI> =
    memo(({ className, block }) => {
        const mods: ModsType = {};
        return (
            <div
                className={classNames(cls['articleBlock-text'], mods, [
                    className,
                ])}
            >
                {block.title ? (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                title={block.title}
                                className={cls.title}
                            />
                        }
                        off={
                            <TextDeprecated
                                title={block.title}
                                className={cls.title}
                            />
                        }
                    />
                ) : null}
                {block.paragraphs.map((paragraph) => (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                key={paragraph}
                                text={paragraph}
                                className={cls.paragraph}
                            />
                        }
                        off={
                            <TextDeprecated
                                key={paragraph}
                                text={paragraph}
                                className={cls.paragraph}
                            />
                        }
                    />
                ))}
            </div>
        );
    });
