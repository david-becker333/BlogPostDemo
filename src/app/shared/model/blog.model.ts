import { IUser } from './user.model';


export interface IPost {
    id?: number,
    userId?: number,
    userInfo?: IUser,
    title?: string,
    body?: string
}

export class Post implements IPost {
    constructor(
        public id?: number,
        public userId?: number,
        public title?: string,
        public body?: string
    ) {
        this.id = id ? id : null;
        this.userId = userId ? userId : null;
        this.title = title ? title : null;
        this.body = body ? body : null;
    }
}

export interface IBlogPost {
    post?: IPost;
    userinfo?: IUser;
}

export interface IQuery {
    sort?: string;
    page?: number;
    itemsPerPage?: number;
}

export interface ISelectItem {
    label: string;
    value: any;
}