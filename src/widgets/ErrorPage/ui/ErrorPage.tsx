import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import cls from './ErrorPage.module.scss';

interface ErrorPagePropsI {
   className?: string;
}

export const ErrorPage: React.FC<ErrorPagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('errorPage');

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={classNames(cls.errorPage, {}, [className])}>
            <p className={cls.errorText}>
                {
                    t('Oops!')
                }
            </p>
            <div className={cls.errorDescription}>
                {
                    t('Что-то пошло не так, попробуйте обновить страницу.')
                }
            </div>
            <Button
                onClick={reloadPage}
                className={cls['error-button']}
            >
                {
                    t('Обновить страницу')
                }
            </Button>
        </div>
    );
};
