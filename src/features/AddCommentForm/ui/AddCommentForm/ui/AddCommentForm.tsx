import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCommentFormText } from '../../../model/selectors/getCommentFormText/getCommentFormText';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
    className,
    onSendComment,
}) => {
    const { t } = useTranslation();
    const text = useSelector(getCommentFormText);
    const dispatch = useAppDispatch();

    const onCommentTextHandler = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextHandler('');
    }, [onCommentTextHandler, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={INITIAL_REDUCERS}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        padding="24"
                        border="partial"
                        max
                    >
                        <HStack
                            max
                            justify="between"
                            align="center"
                            gap="16"
                            className={classNames(cls['form-redesigned'], {}, [
                                className,
                            ])}
                            data-testid="AddCommentForm"
                        >
                            <Input
                                className={cls.input}
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                onChange={onCommentTextHandler}
                                data-testid="AddCommentForm.Input"
                            />
                            <Button
                                onClick={onSendHandler}
                                data-testid="AddCommentForm.Button"
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        max
                        justify="between"
                        align="center"
                        className={classNames(cls['addСomment-form'], {}, [
                            className,
                        ])}
                        data-testid="AddCommentForm"
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            onChange={onCommentTextHandler}
                            data-testid="AddCommentForm.Input"
                        />
                        <ButtonDeprecated
                            onClick={onSendHandler}
                            data-testid="AddCommentForm.Button"
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(AddCommentForm);
