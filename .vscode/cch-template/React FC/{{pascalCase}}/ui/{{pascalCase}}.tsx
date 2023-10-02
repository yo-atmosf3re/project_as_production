import React from 'react';
import cls from './{{pascalCase}}.module.scss';
import { useTranslation } from 'react-i18next';

interface {{pascalCase}}PropsI {
    className?: string;
}

export const {{pascalCase}}: React.FC<{{pascalCase}}PropsI> = ({
    className
}) => {
    const {t} = useTranslation();
    return (
        <div 
        className={classNames(cls.{{pascalCase}}, {}, [className])
        }>
        {{pascalCase}}
        </div >
    )
}