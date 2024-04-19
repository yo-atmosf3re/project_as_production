import { ArticleBlockI } from '../../../model/types/article';
import { ARTICLE_BLOCK_TYPE } from '@/shared/const/consts';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

/**
 * Декомпозиция блоков: в зависимости от типа блока будет возвращаться нужная компонента. Затем, этот коллбэк попадает в функцию map (article?.blocks.map(renderBlock)), где каждый элемент blocks будет попадать в этот коллбэк и будет отрисовываться нужный блок пока не закончатся элементы в массиве blocks;
 * @param block
 */
export const renderArticleBlock = (block: ArticleBlockI) => {
    switch (block.type) {
        case ARTICLE_BLOCK_TYPE.CODE: {
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        }
        case ARTICLE_BLOCK_TYPE.IMAGE: {
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        }
        case ARTICLE_BLOCK_TYPE.TEXT: {
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        }
        default:
            return null;
    }
};
