import { COUNTRY } from '@/entities/Country';
import { CURRENCY } from '@/shared/const/consts';

export interface ProfileI {
    id?: string;
    first?: string;
    lastname?: string;
    age?: number;
    currency?: CURRENCY;
    country?: COUNTRY;
    city?: string;
    username?: string;
    avatar?: string;
}
