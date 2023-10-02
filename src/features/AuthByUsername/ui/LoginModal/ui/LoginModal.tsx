import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import cls from './LoginModal.module.scss';
import { LoginForm } from '../../LoginForm';

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
        className={classNames(cls['login-modal'], {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
    >
        <LoginForm />
    </Modal>
);
