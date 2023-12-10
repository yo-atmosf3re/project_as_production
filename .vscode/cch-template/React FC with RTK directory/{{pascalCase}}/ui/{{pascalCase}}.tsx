import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './{{pascalCase}}.module.scss';

interface {{pascalCase}}PropsI {
    className?: string;
}

/**
 *
 * @param className
 */
export const {{pascalCase}}: React.FC<{{pascalCase}}PropsI> = ({
    className
}) => {
    const {t} = useTranslation();
    return (
        <div 
            className={classNames(cls.{{pascalCase}}, {},   [className])
        }>
            {{pascalCase}}
        </div>
    );
};
