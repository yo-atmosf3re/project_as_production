import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './User.module.scss';

interface UserPropsI {
    className?: string;
}

export const User: React.FC<UserPropsI> = ({
    className,
}) => {
    const test = '1';
    return (
        <div className={classNames(cls.User, {}, [className])}>
            User
        </div>
    );
};
