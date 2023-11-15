export type BuildMode = 'production' | 'development';

export interface BuildPaths {
   entry: string;
   build: string;
   html: string;
   src: string;
   // ? Путь до файлов с переводами;
   locales: string;
   // ? Путь, в который нужно перемещать переводы;
   buildLocales: string;
}

export interface BuildEnv {
   mode: BuildMode;
   port: number;
   apiUrl: string;
}

export interface BuildOptions {
   mode: BuildMode;
   paths: BuildPaths;
   isDev: boolean;
   port: number;
   apiUrl: string;
   /**
    * Переменная для разграничения сред где будет выполняться код. Для каждого значения этой переменной своя конфигурация, благодаря такой переменной можно переопределить среду выполнения;
    * @argument storybook - для выполнения кода в storybook-сторисах;
    * @argument frontend - для выполнения кода в основном проекте, в котором мы работаем;
    * @argument jest - для выполнения кода в тестовой среде где выполняются unit и интеграционные тесты;
    */
   project: 'storybook' | 'frontend' | 'jest';
}
