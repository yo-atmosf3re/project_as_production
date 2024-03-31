import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import TiledIcon from '@/shared/assets/icons/square_cell_button.svg';
import ListIcon from '@/shared/assets/icons/burger_button.svg';
import { BUTTON_THEME, Button } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ARTICLE_VIEW } from '@/shared/const/consts';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorPropsI {
    className?: string;
    view: ARTICLE_VIEW;
    onViewClickHandler?: (view: ARTICLE_VIEW) => void;
}

const VIEW_TYPES = [
    {
        view: ARTICLE_VIEW.SMALL,
        icon: TiledIcon,
    },
    {
        view: ARTICLE_VIEW.BIG,
        icon: ListIcon,
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
    return (
        <div
            className={classNames(cls['article-view_selector'], {}, [
                className,
            ])}
        >
            {VIEW_TYPES.map((viewType) => (
                <Button
                    key={String(viewType.icon)}
                    theme={BUTTON_THEME.CLEAR}
                    onClick={onClickHandler(viewType.view)}
                    className={classNames('', {
                        [cls.selected]: viewType.view === view,
                        [cls['not-selected']]: viewType.view !== view,
                    })}
                >
                    <Icon
                        Svg={viewType.icon}
                        height={24}
                        width={24}
                    />
                </Button>
            ))}
        </div>
    );
};
