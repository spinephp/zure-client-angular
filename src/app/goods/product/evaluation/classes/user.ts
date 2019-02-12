import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';

export interface UserData {
    id: string;
    username: string;
    picture: string;
    nick: string;
    country: string;
}

export class AUser extends AItem<UserData> {
    constructor(auser: UserData) {
        super(auser);
    }
    getName() { return this.item.nick || this.item.username; }
}

export class User extends Yrrdb<AUser, UserData> {

    constructor(datas: UserData[]) {
        super(datas, AUser);
    }
}
