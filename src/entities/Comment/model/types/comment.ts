import { UserI } from '../../../User/models/types/user';

export interface CommentI {
    id: string;
    user: UserI;
    text: string;
}
