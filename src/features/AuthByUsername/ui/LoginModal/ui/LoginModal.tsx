import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import { Loader } from 'shared/ui/Loader';
import { LoginFormAsync } from '../../LoginForm/ui/LoginForm.async';

interface LoginModalPropsI {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

// ? Модальное окно, которое содержит в себе логику LoginForm, логику самого модального окна. Оболочка для компоненты LoginForm. Благодаря этому исключается использование LoginForm из вне;
export const LoginModal: React.FC<LoginModalPropsI> = ({
    className, isOpen, onClose,
}) => (
    <Modal
        lazy
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
    >
        <Suspense fallback={<Loader />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
