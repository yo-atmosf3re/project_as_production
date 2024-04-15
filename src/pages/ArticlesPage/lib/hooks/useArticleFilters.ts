import { useCallback } from "react";
import { useSelector } from "react-redux";
import { ARTICLE_VIEW, ARTICLE_SORT_FIELD, ARTICLE_TYPE } from "@/shared/const/consts";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebouce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { SortOrderType } from "@/shared/types";
import { 
    getArticlesPageView, getArticlesPageOrder, 
    getArticlesPageSort, getArticlesPageSearch, 
    getArticlesPageType } from "../../model/selectors";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../model/slice/articlesPageSlice";

interface ArticleFiltersDataI {
    view: ARTICLE_VIEW;
    order: SortOrderType;
    sort: ARTICLE_SORT_FIELD;
    search: string;
    type: ARTICLE_TYPE;
    onChangeView: (view: ARTICLE_VIEW) => void;
    onChangeSort: (newSort: ARTICLE_SORT_FIELD) => void;
    onChangeOrder: (newOrder: SortOrderType) => void;
    onChangeSearch: (search: string) => void;
    onChangeType: (value: ARTICLE_TYPE) => void;
}

/**
 * Кастомный хук, который инкапсулирует в себе логику по работе со статьями: запрос статей с фильтрами, фильтрация и поиск. Возвращает нужные данные в виде объекта;
 */
export function useArticleFilters(): ArticleFiltersDataI {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    // ? Избавляясь от лишних сайд-эффектов, передаём эту функцию в каждый обработчик;
    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebouce(fetchData, 500);


    const onChangeView = useCallback(
        (view: ARTICLE_VIEW) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: ARTICLE_SORT_FIELD) => {
            dispatch(articlesPageActions.setSort(newSort));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrderType) => {
            dispatch(articlesPageActions.setOrder(newOrder));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search));
            dispatch(articlesPageActions.setPage(1));
            // ? Подгрузка данных будет происходит с использованием debounce, а ввод текста будет без задержки;
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (value: ARTICLE_TYPE) => {
            dispatch(articlesPageActions.setType(value));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        order,
        sort,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    }
}