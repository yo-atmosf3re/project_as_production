import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

   // ? Если не нужен тайпскрипт, то нужен babel-loader - это специальный транспилятор, который берет новый стандарт JS и перегоняет его в старый для поддержки всех браузеров (это простыми словами). Точно так же babel умеет работать с JSX;
   const typescriptLoader = {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
   }

   const cssLoader = {
      test: /\.s[ac]ss$/i,
      use: [
         isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
         {
            loader: 'css-loader',
            options: {
               modules: {
                  auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                  localIdentName: isDev
                     ? '[path][name]__[local]--[hash:base64:5]'
                     : '[hash:base64:8]'
               }
            }
         },
         "sass-loader",
      ],
   }

   return [
      typescriptLoader,
      cssLoader,
   ]
} 