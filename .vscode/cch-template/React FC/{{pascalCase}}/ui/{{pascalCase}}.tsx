import React from 'react';
import cls from './{{pascalCase}}.module.scss';

interface {{pascalCase}}PropsI {
    className?: string;
}

export const {{pascalCase}}: React.FC<{{pascalCase}}PropsI> = ({
    className
}) => {
    return (
        <div className={classNames(cls.{{pascalCase}}, {}, [className])
}>

        </div >
    )
}