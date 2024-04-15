import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import TiledIconDeprecated from '@/shared/assets/icons/square_cell_button.svg';
import ListIconDeprecated from '@/shared/assets/icons/burger_button.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import {
    BUTTON_THEME,
    Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import cls from './ArticleViewSelector.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorPropsI {
    className?: string;
    view: ARTICLE_VIEW;
    onViewClickHandler?: (view: ARTICLE_VIEW) => void;
}

const VIEW_TYPES = [
    {
        view: ARTICLE_VIEW.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ARTICLE_VIEW.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];
/**
 * Компонента, которая работает с переключением отображаемого вида статей в списке на странице ArticlesPage;
 * @param className
 * @param view - текущее значение выбранного вида отображения;
 * @param onViewClickHandler - переключатель вида отображения;
 */
export const ArticleViewSelector: React.FC<ArticleViewSelectorPropsI> = ({
    className,
    view,
    onViewClickHandler,
}) => {
    // ? Такое использование замыкания выглядело бы так же как, если бы в Button передавалось вот это onClick={() => onClickHandler(viewType.view)}, и это классический вариант передачи коллбэка с каким-то принимаемым аргументом в onClick тега button, а представленный ниже вариант короче и делает тоже самое;
    const onClickHandler = (newView: ARTICLE_VIEW) => () => {
        onViewClickHandler?.(newView);
    };

    const deprecatedViewSelector = (
        <div
            className={classNames(cls['article-view_selector'], {}, [
                className,
            ])}
        >
            {VIEW_TYPES.map((viewType) => (
                <ButtonDeprecated
                    key={String(viewType.icon)}
                    theme={BUTTON_THEME.CLEAR}
                    onClick={onClickHandler(viewType.view)}
                    className={classNames('', {
                        [cls.selected]: viewType.view === view,
                        [cls['not-selected']]: viewType.view !== view,
                    })}
                >
                    <IconDeprecated
                        Svg={viewType.icon}
                        height={24}
                        width={24}
                    />
                </ButtonDeprecated>
            ))}
        </div>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(cls['article-view_redesigned'], {}, [
                        className,
                    ])}
                    border="round"
                >
                    <HStack gap="8">
                        {VIEW_TYPES.map((viewType) => (
                            <Icon
                                Svg={viewType.icon}
                                clickable
                                onClick={onClickHandler(viewType.view)}
                                className={classNames('', {
                                    [cls['not-selected']]:
                                        viewType.view !== view,
                                })}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={deprecatedViewSelector}
        />
    );
};
