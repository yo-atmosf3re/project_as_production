import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/ui/Stack';
import { getCommentFormText } from '../../../model/selectors/getCommentFormText/getCommentFormText';
import { addCommentFormActions, addCommentFormReducer } from '../../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormPropsI {
    className?: string;
    onSendComment: (text: string) => void;
}

const INITIAL_REDUCERS: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

// ? Пример того как нужно правильно и хорошо изолировать feature. Функция отправки комментария делигирована на вышестоящий компонент;
/**
 * Компонента, отвечающая за добавление комментариев.;
 * @param className
 * @param onSendComment - функция для отправки комментария;
 */
const AddCommentForm: React.FC<AddCommentFormPropsI> = ({
    className, onSendComment,
}) => {
    const { t } = useTranslation();
    const text = useSelector(getCommentFormText);
    const dispatch = useAppDispatch();

    const onCommentTextHandler = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextHandler('');
    }, [onCommentTextHandler, onSendComment, text]);

    return (
        <DynamicModuleLoader
            reducers={INITIAL_REDUCERS}
        >
            <HStack
                max
                justify="between"
                align="center"
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
                <Button
                    onClick={onSendHandler}
                >
                    {
                        t('Отправить')
                    }
                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
};

export default memo(AddCommentForm);
