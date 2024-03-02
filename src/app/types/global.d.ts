/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

// ? Для файлов .scss;
declare module '*.scss' {
    // ? Типизация для classNames при импортах, нужно, чтобы не было проблем при использовании classNames, и чтобы можно было использовать scss.module;
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

// ? Для файлов .svg;
declare module '*.svg' {
    import React from 'react';

    // ? Это для использования svg в виде компоненты;
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

// ? Для файлов png, jpg, .jpeg;
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// ? Глобальная константа, переменная окружения - нужна для того, чтобы определить какая сборка - dev, prod;
declare const __IS_DEV__: boolean;
// ? Глобальная константа, переменная окружения - определение URL сервера;
declare const __API__: string;
// ? Глобальная константа, переменная окружения - определение среды выполнения кода в зависимости от значения этой переменной;
declare const __PROJECT__: 'storybook' | 'fronted' | 'jest';

/**
 * Собственноручно написанный DeepPartial.
 * DeepPartial даёт возможность частично или полностью скопировать state. Некоторые свойства, при их наличии, могут быть полностью скопированы (глубоко) или нет - при их отсутствии;
 */
type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

/**
 * Классический Record, но с опциональными свойствами. Даёт возможность создавать объекты с опциональными свойствами;
 */
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
