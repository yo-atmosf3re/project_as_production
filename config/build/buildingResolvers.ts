import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildingResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            // ? Для избежания коллизий в названиях при импорте библиотек и файлов проекта;
            '@': options.paths.src,
        },
    };
}
