import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getCommentFormText } from '../../../model/selectors/getCommentFormText/getCommentFormText';
import { getCommentFormError } from '../../../model/selectors/getCommentFormError/getCommentFormError';
import { addCommentFormActions, addCommentFormReducer } from '../../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

interface AddCommentFormPropsI {
    className?: string;
}

const INITIAL_REDUCERS: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

// ? Пример того как нужно правильно и хорошо изолировать feature;
/**
 * Компонента, отвечающая за добавление комментариев;
 * @param className
 */
const AddCommentForm: React.FC<AddCommentFormPropsI> = ({
    className,
}) => {
    const { t } = useTranslation();
    const text = useSelector(getCommentFormText);
    const error = useSelector(getCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextHandler = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <div
                className={classNames(cls['addСomment-form'], {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={
                        t('Введите текст комментария')
                    }
                    value={text}
                    onChange={onCommentTextHandler}
                />
                <Button>
                    {
                        t('Отправить')
                    }
                </Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(AddCommentForm);
