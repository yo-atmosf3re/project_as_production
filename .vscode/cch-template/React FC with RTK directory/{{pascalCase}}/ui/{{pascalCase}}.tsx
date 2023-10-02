import React from 'react';
import cls from './{{pascalCase}}.module.scss';

interface {{pascalCase}}PropsI {
    className?: string;
}

export const {{pascalCase}}: React.FC<{{pascalCase}}PropsI> = ({
    className
}) => {
    const variables = '1';
    return (
        <div 
        className={classNames(cls.{{pascalCase}}, {}, [className])
        }>
        {{pascalCase}}
        </div >
    )
}