/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

// ? Для файлов .scss;
declare module '*.scss' {

   // ? Типизация для classNames при импортах, нужно, чтобы не было проблем при использовании classNames, и чтобы можно было использовать scss.module;
   interface IClassNames {
      [className: string]: string
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
// ? Глобавльная константа, переменная окружения - определение URL сервера;
declare const __API__: string;
