import { DropdownDirectionUnionType } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const MAP_DIRECTION_CLASS: Record<DropdownDirectionUnionType, string> = {
    'bottom left': cls['options-bottom_left'],
    'bottom right': cls['options-bottom_right'],
    'top left': cls['options-top_left'],
    'top right': cls['options-top_right'],
};
