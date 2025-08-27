export interface IUser {
    id?: number;
    username: string;
    password: string;
    created_at?: Date;
}

export class User implements IUser {
    id?: number;
    username: string;
    password: string;
    created_at?: Date;

    constructor(username: string, password: string, id?: number, created_at?: Date){
        this.username = username;
        this.password = password;
        this.id = id;
        this.created_at = created_at;
    }
}